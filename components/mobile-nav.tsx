"use client"

import { cn } from "@/lib/utils"

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-all md:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={onClose}
    />
  )
}
