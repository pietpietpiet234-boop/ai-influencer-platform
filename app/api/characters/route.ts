import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createCharacterSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  gender: z.string().optional(),
  age: z.number().optional(),
  ethnicity: z.string().optional(),
  hairColor: z.string().optional(),
  hairStyle: z.string().optional(),
  eyeColor: z.string().optional(),
  bodyType: z.string().optional(),
  artStyle: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const data = createCharacterSchema.parse(body)

    const character = await prisma.character.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    })

    return NextResponse.json(character)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Error creating character:", error)
    return NextResponse.json(
      { error: "Failed to create character" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const characters = await prisma.character.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(characters)
  } catch (error) {
    console.error("Error fetching characters:", error)
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 }
    )
  }
}
