import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  variant?: string
  onClick?: () => void
}

type SidebarProps = {
  items: SidebarItem[]
  footer?: SidebarItem
}

export function MainSidebar({ items, footer }: SidebarProps) {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel>Documentação</SidebarGroupLabel>
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
      {footer && (
        <SidebarFooter>
          <SidebarMenuButton
            asChild
            variant={
              footer.variant === 'default' ||
              footer.variant === 'outline' ||
              footer.variant === 'red_centered'
                ? footer.variant
                : 'default'
            }
          >
            <a href={footer.key}>
              {footer.icon}
              <span>{footer.label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
