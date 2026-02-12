"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Users,
  ImageIcon,
  Video,
  Settings,
  LogOut,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/characters", label: "Characters", icon: Users },
  { href: "/dashboard/generate", label: "Generate", icon: Sparkles },
  { href: "/dashboard/gallery", label: "Gallery", icon: ImageIcon },
]

interface DashboardNavProps {
  user: {
    name?: string | null
    email?: string | null
    credits?: number
    tier?: string
  }
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-900 rounded-lg p-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                AI Influencer
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-semibold text-white">{user.credits}</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <span className="text-xs text-slate-400 uppercase tracking-wide">{user.tier}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hover:bg-white/5 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
