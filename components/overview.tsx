"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    projects: 12,
    servers: 24,
    urls: 65,
  },
  {
    name: "Feb",
    projects: 14,
    servers: 26,
    urls: 78,
  },
  {
    name: "Mar",
    projects: 16,
    servers: 28,
    urls: 90,
  },
  {
    name: "Apr",
    projects: 18,
    servers: 30,
    urls: 102,
  },
  {
    name: "May",
    projects: 20,
    servers: 32,
    urls: 110,
  },
  {
    name: "Jun",
    projects: 22,
    servers: 34,
    urls: 118,
  },
  {
    name: "Jul",
    projects: 24,
    servers: 36,
    urls: 128,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="projects" fill="#adfa1d" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="servers" fill="#1e88e5" radius={[4, 4, 0, 0]} className="fill-blue-500" />
        <Bar dataKey="urls" fill="#ff5722" radius={[4, 4, 0, 0]} className="fill-orange-500" />
      </BarChart>
    </ResponsiveContainer>
  )
}
