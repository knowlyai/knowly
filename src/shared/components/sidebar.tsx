import { Button } from '@/shared/components/button'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export type SidebarItem = {
  label: string
  icon: React.ReactNode
  key: string
  onClick?: () => void
}

type SidebarProps = {
  items: SidebarItem[]
  selectedKey?: string
  onSelect?: (key: string) => void
  children?: React.ReactNode // Para ações extras no rodapé
  className?: string
}

export function Sidebar({ items, selectedKey, children }: SidebarProps) {
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      const savedCollapsed = localStorage.getItem('sidebar-collapsed')
      return savedCollapsed ? JSON.parse(savedCollapsed) : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed))
    } catch {
      console.warn('localStorage não está disponível')
    }
  }, [isCollapsed])

  function handleNavigation(key: string) {
    navigate(`/${key}`)
  }

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <motion.aside
      className={`bg-background border-border z-10 flex h-full flex-col justify-between px-4 py-8 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-96'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          className="hover:bg-muted/50 text-foreground h-10 w-10 self-start"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.key}
              className={`flex items-center gap-3 rounded-lg font-medium transition-colors ${
                selectedKey === item.key
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted/50 text-foreground/80'
              } ${isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3'}`}
              onClick={() => handleNavigation(item.key)}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!isCollapsed && item.label}
            </button>
          ))}
        </nav>
      </div>
      {children && (
        <div className="flex items-center justify-center gap-2 px-2 py-3">
          {children}
        </div>
      )}
    </motion.aside>
  )
}
