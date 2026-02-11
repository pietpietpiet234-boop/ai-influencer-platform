import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Influencer Platform - Create AI-Generated Content",
  description: "Create and manage AI influencer characters. Generate stunning images, videos, and talking avatars with our powerful AI tools.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
