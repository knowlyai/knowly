import { Button } from '@/shared/components/button'
import { BrainCircuit, LogOut, User, Wallet, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export type SidebarItem = {
  label: string
  icon: React.ReactNode
  key: string
}

const items: SidebarItem[] = [
  { label: 'Dados de cadastro', icon: <User />, key: 'user' },
  { label: 'Minhas bases', icon: <BrainCircuit />, key: 'bases' },
  { label: 'Assinatura', icon: <Wallet />, key: 'subscription' }
]

export function Sidebar() {
  const navigate = useNavigate()
  const pageUrl = window.location.pathname
  const selected =
    items.find((item) => pageUrl.includes(item.key))?.key || 'user'

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

  function handleLogout() {
    // Adicionar lógica de desfazer o login (deslogar o usuário)
    navigate('/')
  }

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
      {/* Botão para toggle da sidebar */}
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
                selected === item.key
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

      <Button
        variant="ghost"
        className={`hover:bg-muted/50 flex items-center text-red-600 ${
          isCollapsed ? 'justify-center px-2 py-3' : 'gap-2 px-4 py-3'
        }`}
        onClick={handleLogout}
        title={isCollapsed ? 'Sair' : undefined}
      >
        <LogOut className="h-5 w-5" />
        {!isCollapsed && 'Sair'}
      </Button>
    </motion.aside>
  )
}
