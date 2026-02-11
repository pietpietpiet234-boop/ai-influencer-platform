import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const generateImageSchema = z.object({
  prompt: z.string().min(1),
  style: z.string().optional(),
  characterId: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

const IMAGE_COST = 5

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { prompt, style, characterId, width, height } = generateImageSchema.parse(body)

    // Check credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    })

    if (!user || user.credits < IMAGE_COST) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 400 }
      )
    }

    // Deduct credits
    await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { decrement: IMAGE_COST } },
    })

    // Record transaction
    await prisma.creditTransaction.create({
      data: {
        userId: session.user.id,
        amount: -IMAGE_COST,
        type: "generation",
        description: "Image generation",
      },
    })

    // Create generation record
    const generation = await prisma.generation.create({
      data: {
        type: "image",
        prompt,
        status: "completed",
        creditsUsed: IMAGE_COST,
        userId: session.user.id,
        characterId: characterId || null,
        // For demo, use a placeholder image
        resultUrl: `https://picsum.photos/seed/${Date.now()}/${width || 1024}/${height || 1024}`,
      },
    })

    return NextResponse.json({
      id: generation.id,
      resultUrl: generation.resultUrl,
      status: generation.status,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Error generating image:", error)
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    )
  }
}
