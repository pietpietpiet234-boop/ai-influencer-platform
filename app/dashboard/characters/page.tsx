import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

async function getCharacters(userId: string) {
  return prisma.character.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })
}

export default async function CharactersPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const characters = await getCharacters(session.user.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Characters</h1>
          <p className="text-muted-foreground">
            Manage your AI influencer characters
          </p>
        </div>
        <Link href="/dashboard/characters/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Character
          </Button>
        </Link>
      </div>

      {characters.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No characters yet</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-4">
              Create your first AI influencer character to start generating content
            </p>
            <Link href="/dashboard/characters/new">
              <Button>Create Character</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <Card key={character.id}>
              <CardHeader>
                <CardTitle>{character.name}</CardTitle>
                <CardDescription>
                  {character.gender} • {character.artStyle || "Realistic"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-md bg-muted mb-4 overflow-hidden">
                  {character.referenceUrl ? (
                    <img
                      src={character.referenceUrl}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No reference image
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {character.description || "No description"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
