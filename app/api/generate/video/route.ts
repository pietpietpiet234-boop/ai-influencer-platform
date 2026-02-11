import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const generateVideoSchema = z.object({
  imageUrl: z.string().url(),
  motionStrength: z.number().min(1).max(10).optional(),
})

const VIDEO_COST = 20

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { imageUrl, motionStrength } = generateVideoSchema.parse(body)

    // Check credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    })

    if (!user || user.credits < VIDEO_COST) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 400 }
      )
    }

    // Deduct credits
    await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { decrement: VIDEO_COST } },
    })

    // Record transaction
    await prisma.creditTransaction.create({
      data: {
        userId: session.user.id,
        amount: -VIDEO_COST,
        type: "generation",
        description: "Video generation",
      },
    })

    // Create generation record
    const generation = await prisma.generation.create({
      data: {
        type: "video",
        prompt: `Video from image: ${imageUrl}`,
        status: "processing",
        creditsUsed: VIDEO_COST,
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      id: generation.id,
      status: generation.status,
      message: "Video generation started. Check your gallery for results.",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Error generating video:", error)
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 }
    )
  }
}
