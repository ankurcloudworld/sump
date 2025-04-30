"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Server, Globe, FolderKanban, AlertTriangle, CheckCircle2, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
    action: "created a new project",
    target: "E-commerce Platform",
    time: "2 hours ago",
    icon: FolderKanban,
    iconColor: "text-green-500",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    action: "updated server",
    target: "API-Server-01",
    time: "3 hours ago",
    icon: Server,
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    user: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "MJ",
    },
    action: "reported URL down",
    target: "api.example.com/v2",
    time: "5 hours ago",
    icon: AlertTriangle,
    iconColor: "text-red-500",
  },
  {
    id: 4,
    user: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "SW",
    },
    action: "added new URL",
    target: "dashboard.example.com",
    time: "1 day ago",
    icon: Globe,
    iconColor: "text-purple-500",
  },
  {
    id: 5,
    user: {
      name: "Alex Brown",
      email: "alex@example.com",
      avatar: "/placeholder-user.jpg",
      initials: "AB",
    },
    action: "marked project as completed",
    target: "Internal Dashboard",
    time: "2 days ago",
    icon: CheckCircle2,
    iconColor: "text-green-500",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} <span className="font-medium text-foreground">{activity.target}</span>
            </p>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {activity.time}
            </div>
          </div>
          <div className={`${activity.iconColor}`}>
            <activity.icon className="h-5 w-5" />
          </div>
        </div>
      ))}
    </div>
  )
}
