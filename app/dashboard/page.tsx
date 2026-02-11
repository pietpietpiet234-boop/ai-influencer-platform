import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Users, ImageIcon, Video } from "lucide-react"

async function getDashboardData(userId: string) {
  const [characters, generations, recentGenerations] = await Promise.all([
    prisma.character.count({ where: { userId } }),
    prisma.generation.count({ where: { userId } }),
    prisma.generation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { character: true },
    }),
  ])

  return { characters, generations, recentGenerations }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const data = await getDashboardData(session.user.id)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Characters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.characters}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generations</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.generations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{session.user.credits}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start creating AI content</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/dashboard/characters/new">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Create New Character
              </Button>
            </Link>
            <Link href="/dashboard/generate">
              <Button className="w-full justify-start" variant="outline">
                <ImageIcon className="mr-2 h-4 w-4" />
                Generate Image
              </Button>
            </Link>
            <Link href="/dashboard/generate">
              <Button className="w-full justify-start" variant="outline">
                <Video className="mr-2 h-4 w-4" />
                Generate Video
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Creations</CardTitle>
            <CardDescription>Your latest generated content</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentGenerations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No generations yet. Start creating!
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {data.recentGenerations.map((gen) => (
                  <div
                    key={gen.id}
                    className="aspect-square rounded-md bg-muted flex items-center justify-center overflow-hidden"
                  >
                    {gen.resultUrl ? (
                      <img
                        src={gen.resultUrl}
                        alt={gen.prompt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground text-center px-2">
                        {gen.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
