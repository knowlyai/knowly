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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'

export type SidebarSections = {
  label: string
  items: SidebarItem[]
}
export type SidebarItem = {
  label: string
  icon: React.ReactNode
  key: string
  variant?: string
  onClick?: () => void
}

type SidebarProps = {
  sections: SidebarSections[]
  footer?: SidebarItem
}

export function MainSidebar({ sections, footer }: SidebarProps) {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent className="flex-1">
        {sections.map((section) => (
          <Collapsible key={section.label} defaultOpen>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {section.label}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
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
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
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
