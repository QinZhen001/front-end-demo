import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import AppLayout from "@/components/Layout/index"

import "../theme/variable.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "fontend demo",
  description: "web前端demo大全",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <AppLayout>
          {children}
          <Toaster />
        </AppLayout>
      </body>
    </html>
  )
}
