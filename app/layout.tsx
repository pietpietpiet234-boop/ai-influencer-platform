import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Influencer Platform",
  description: "Create and manage AI-generated influencers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
