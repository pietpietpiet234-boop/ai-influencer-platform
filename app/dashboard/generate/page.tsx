"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Video, Loader2 } from "lucide-react"

interface Character {
  id: string
  name: string
  artStyle: string
}

const imageStyles = [
  "Realistic",
  "Anime",
  "Cartoon",
  "Artistic",
  "Cyberpunk",
  "Fantasy",
  "3D Render",
  "Oil Painting",
]

export default function GeneratePage() {
  const router = useRouter()
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    fetchCharacters()
  }, [])

  async function fetchCharacters() {
    try {
      const res = await fetch("/api/characters")
      if (res.ok) {
        const data = await res.json()
        setCharacters(data)
      }
    } catch (error) {
      console.error("Error fetching characters:", error)
    }
  }

  async function generateImage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setGenerating(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      prompt: formData.get("prompt") as string,
      style: formData.get("style") as string,
      characterId: formData.get("characterId") as string,
      width: 1024,
      height: 1024,
    }

    try {
      const res = await fetch("/api/generate/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Failed to generate image")
      }

      setResult(result)
    } catch (error: any) {
      setResult({ error: error.message })
    } finally {
      setGenerating(false)
    }
  }

  async function generateVideo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setGenerating(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      imageUrl: formData.get("imageUrl") as string,
      motionStrength: parseInt(formData.get("motionStrength") as string) || 5,
    }

    try {
      const res = await fetch("/api/generate/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Failed to generate video")
      }

      setResult(result)
    } catch (error: any) {
      setResult({ error: error.message })
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Generate Content</h1>
        <p className="text-muted-foreground">
          Create AI-generated images and videos
        </p>
      </div>

      <Tabs defaultValue="image" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="image">
            <ImageIcon className="mr-2 h-4 w-4" />
            Image
          </TabsTrigger>
          <TabsTrigger value="video">
            <Video className="mr-2 h-4 w-4" />
            Video
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-6 lg:grid-cols-2">
          <TabsContent value="image" className="mt-0">
            <Card>
              <form onSubmit={generateImage}>
                <CardHeader>
                  <CardTitle>Generate Image</CardTitle>
                  <CardDescription>
                    Create stunning AI images from text prompts (5 credits)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Prompt *</Label>
                    <textarea
                      id="prompt"
                      name="prompt"
                      rows={4}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="A beautiful influencer standing on a beach at sunset..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="style">Style</Label>
                    <Select name="style" defaultValue="realistic">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {imageStyles.map((style) => (
                          <SelectItem key={style} value={style.toLowerCase()}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="characterId">Character (Optional)</Label>
                    <Select name="characterId">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a character for consistency" />
                      </SelectTrigger>
                      <SelectContent>
                        {characters.map((char) => (
                          <SelectItem key={char.id} value={char.id}>
                            {char.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={generating}>
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Generate Image (5 credits)
                      </>
                    )}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="video" className="mt-0">
            <Card>
              <form onSubmit={generateVideo}>
                <CardHeader>
                  <CardTitle>Generate Video</CardTitle>
                  <CardDescription>
                    Transform images into animated videos (20 credits)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL *</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motionStrength">Motion Strength (1-10)</Label>
                    <Input
                      id="motionStrength"
                      name="motionStrength"
                      type="number"
                      min={1}
                      max={10}
                      defaultValue={5}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={generating}>
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Video className="mr-2 h-4 w-4" />
                        Generate Video (20 credits)
                      </>
                    )}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </TabsContent>

          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>
                Your generated content will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                result.error ? (
                  <div className="p-4 text-red-500 bg-red-50 rounded-md">
                    {result.error}
                  </div>
                ) : result.resultUrl ? (
                  <div className="space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={result.resultUrl}
                        alt="Generated content"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <a
                      href={result.resultUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full">
                        Download
                      </Button>
                    </a>
                  </div>
                ) : (
                  <div className="p-4 text-amber-600 bg-amber-50 rounded-md">
                    Generation in progress... Check your gallery later.
                  </div>
                )
              ) : (
                <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No generation yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}
