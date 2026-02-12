import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Users, ImageIcon, Video, ArrowRight, Zap } from "lucide-react"

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
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <h1 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="relative text-slate-400 text-lg">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          title="Total Characters"
          value={data.characters}
          gradient="from-purple-500/20 to-purple-600/10"
          border="border-purple-500/20"
        />
        <StatCard
          icon={<Sparkles className="h-5 w-5" />}
          title="Generations"
          value={data.generations}
          gradient="from-pink-500/20 to-pink-600/10"
          border="border-pink-500/20"
        />
        <StatCard
          icon={<Zap className="h-5 w-5" />}
          title="Available Credits"
          value={session.user.credits}
          gradient="from-blue-500/20 to-blue-600/10"
          border="border-blue-500/20"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-slate-400">Start creating AI content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/characters/new">
              <Button className="w-full justify-start group h-12 text-base" variant="outline">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 mr-3 group-hover:bg-purple-500/30 transition-colors">
                  <Users className="h-5 w-5" />
                </div>
                Create New Character
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </Link>
            <Link href="/dashboard/generate">
              <Button className="w-full justify-start group h-12 text-base" variant="outline">
                <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 mr-3 group-hover:bg-pink-500/30 transition-colors">
                  <ImageIcon className="h-5 w-5" />
                </div>
                Generate Image
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </Link>
            <Link href="/dashboard/generate">
              <Button className="w-full justify-start group h-12 text-base" variant="outline">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 mr-3 group-hover:bg-blue-500/30 transition-colors">
                  <Video className="h-5 w-5" />
                </div>
                Generate Video
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Creations */}
        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />
          <CardHeader>
            <CardTitle className="text-xl">Recent Creations</CardTitle>
            <CardDescription className="text-slate-400">Your latest generated content</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentGenerations.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                  <Sparkles className="h-8 w-8 text-slate-500" />
                </div>
                <p className="text-sm text-slate-400 mb-4">No generations yet. Start creating!</p>
                <Link href="/dashboard/generate">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-600">
                    Start Creating
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {data.recentGenerations.map((gen) => (
                  <div
                    key={gen.id}
                    className="group relative aspect-square rounded-xl bg-slate-800/50 flex items-center justify-center overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all"
                  >
                    {gen.resultUrl ? (
                      <>
                        <img
                          src={gen.resultUrl}
                          alt={gen.prompt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-xs text-white line-clamp-2">{gen.prompt}</p>
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 text-center px-2">
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

function StatCard({ icon, title, value, gradient, border }: {
  icon: React.ReactNode;
  title: string;
  value: number;
  gradient: string;
  border: string;
}) {
  return (
    <div className={`
      relative group bg-gradient-to-br from-slate-900/80 to-slate-950/80
      backdrop-blur-xl border ${border} rounded-2xl p-6
      hover:scale-[1.02] hover:shadow-xl transition-all duration-300
      overflow-hidden
    `}>
      <div className={`
        absolute inset-0 bg-gradient-to-br ${gradient} opacity-0
        group-hover:opacity-100 transition-opacity duration-300
      `} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-4xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
