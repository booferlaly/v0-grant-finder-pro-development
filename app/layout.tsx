import type React from "react"
import { SidebarProvider, Sidebar, SidebarHeader, SidebarInset } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/sidebar/sidebar-nav"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="font-bold text-xl">GrantGrunt</div>
                </div>
              </SidebarHeader>
              <SidebarNav />
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
