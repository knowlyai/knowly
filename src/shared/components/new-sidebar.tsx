import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

export type SidebarItem = {
  label: string
  icon: React.ReactNode
  key: string
  onClick?: () => void
}

type SidebarProps = {
  items: SidebarItem[]
}

export function NewSidebar({ items }: SidebarProps) {
  return (
    <SidebarProvider>
      <main>
        <SidebarTrigger />
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <a href={item.key}>
                          {item.icon}
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </main>
    </SidebarProvider>
  )
}
