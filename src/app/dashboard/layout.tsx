//layout com a sidebar
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="container mx-auto pt-8 sm:pt-16 px-4 lg:max-w-6xl">
        {children}
      </main>
    </SidebarProvider>
  )
}
