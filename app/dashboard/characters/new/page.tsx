"use client"

import { useState } from "react"
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

const artStyles = [
  "Realistic",
  "Anime",
  "Cartoon",
  "Artistic",
  "Cyberpunk",
  "Fantasy",
  "3D Render",
  "Oil Painting",
]

const genders = ["Male", "Female", "Non-binary"]
const bodyTypes = ["Slim", "Athletic", "Average", "Curvy", "Muscular"]

export default function NewCharacterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      gender: formData.get("gender") as string,
      age: parseInt(formData.get("age") as string) || null,
      ethnicity: formData.get("ethnicity") as string,
      hairColor: formData.get("hairColor") as string,
      hairStyle: formData.get("hairStyle") as string,
      eyeColor: formData.get("eyeColor") as string,
      bodyType: formData.get("bodyType") as string,
      artStyle: formData.get("artStyle") as string,
    }

    try {
      const res = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to create character")
      }

      router.push("/dashboard/characters")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Character</h1>
        <p className="text-muted-foreground">
          Define your AI influencer&apos;s appearance and personality
        </p>
      </div>

      <Card>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Character Details</CardTitle>
            <CardDescription>
              Fill in the details to create a unique AI influencer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Character Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Luna Star"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your character's personality, background, etc."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender">
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((g) => (
                      <SelectItem key={g} value={g.toLowerCase()}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="25"
                  min={18}
                  max={100}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Input
                  id="ethnicity"
                  name="ethnicity"
                  placeholder="e.g., Caucasian, Asian, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select name="bodyType">
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((bt) => (
                      <SelectItem key={bt} value={bt.toLowerCase()}>
                        {bt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hairColor">Hair Color</Label>
                <Input
                  id="hairColor"
                  name="hairColor"
                  placeholder="e.g., Blonde, Black, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hairStyle">Hair Style</Label>
                <Input
                  id="hairStyle"
                  name="hairStyle"
                  placeholder="e.g., Long wavy, Short pixie, etc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eyeColor">Eye Color</Label>
              <Input
                id="eyeColor"
                name="eyeColor"
                placeholder="e.g., Blue, Brown, Green, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artStyle">Art Style *</Label>
              <Select name="artStyle" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select art style" />
                </SelectTrigger>
                <SelectContent>
                  {artStyles.map((style) => (
                    <SelectItem key={style} value={style.toLowerCase()}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Creating..." : "Create Character"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
