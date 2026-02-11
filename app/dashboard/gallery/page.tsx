import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Video } from "lucide-react"

async function getGenerations(userId: string) {
  return prisma.generation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { character: true },
  })
}

export default async function GalleryPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const generations = await getGenerations(session.user.id)

  const images = generations.filter((g) => g.type === "image")
  const videos = generations.filter((g) => g.type === "video")

  function GenerationCard({ generation }: { generation: typeof generations[0] }) {
    return (
      <Card className="overflow-hidden">
        <div className="aspect-square bg-muted relative">
          {generation.resultUrl ? (
            generation.type === "video" ? (
              <video
                src={generation.resultUrl}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <img
                src={generation.resultUrl}
                alt={generation.prompt}
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm text-muted-foreground capitalize">
                {generation.status}
              </span>
            </div>
          )}
          {generation.watermarked && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              Watermarked
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-sm line-clamp-2 text-muted-foreground mb-2">
            {generation.prompt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="capitalize">{generation.type}</span>
            <span>{generation.creditsUsed} credits</span>
          </div>
          {generation.character && (
            <p className="text-xs text-muted-foreground mt-1">
              Character: {generation.character.name}
            </p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="text-muted-foreground">
          View and manage your generated content
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All ({generations.length})</TabsTrigger>
          <TabsTrigger value="images">
            <ImageIcon className="mr-2 h-4 w-4" />
            Images ({images.length})
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" />
            Videos ({videos.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {generations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No generations yet</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {generations.map((gen) => (
                <GenerationCard key={gen.id} generation={gen} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="images" className="mt-0">
          {images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images yet</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((gen) => (
                <GenerationCard key={gen.id} generation={gen} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="mt-0">
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos yet</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((gen) => (
                <GenerationCard key={gen.id} generation={gen} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
