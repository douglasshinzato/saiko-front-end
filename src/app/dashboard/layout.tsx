//layout com a sidebar
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="container m-auto px-4 w-screen lg:max-w-6xl">
        {children}
      </main>
    </SidebarProvider>
  )
}
