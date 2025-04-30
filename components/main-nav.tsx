"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MainNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Button variant="ghost" className="md:hidden" size="icon" onClick={onMenuClick}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <Link href="/" className="flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">SUAMP</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Dashboard
        </Link>
        <Link
          href="/projects"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Projects
        </Link>
        <Link
          href="/servers"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Servers
        </Link>
        <Link
          href="/urls"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          URLs
        </Link>
        <Link
          href="/users"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Users
        </Link>
      </nav>
    </div>
  )
}
