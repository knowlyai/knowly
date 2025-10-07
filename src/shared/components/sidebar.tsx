import { Button } from '@/shared/components/button'
import { BrainCircuit, LogOut, User, Wallet, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

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

  const [isCollapsed, setIsCollapsed] = useState(true)

  function handleLogout() {
    // Remover token e redirecionar para home
    localStorage.removeItem('access_token')
    navigate('/')
  }

  function handleNavigation(key: string) {
    navigate(`/${key}`)
  }

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed)
  }

  const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
  const variants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0)', opacity: 1 }
  }

  return (
    <motion.aside
      className={`bg-background border-border fixed z-10 flex h-full flex-col justify-between border-1 px-4 py-8 pt-24 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-96'
      }`}
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
    >
      {/* Botão para toggle da sidebar */}
      <div className="flex flex-col justify-center gap-4">
        <motion.div transition={transition} variants={variants}>
          <Button
            variant="ghost"
            className="hover:bg-muted/50 text-foreground self-start"
            onClick={toggleSidebar}
          >
            <Menu />
          </Button>
        </motion.div>

        <motion.nav className="flex flex-col gap-2">
          {items.map((item) => (
            <motion.button
              key={item.key}
              className={`flex items-center gap-3 rounded-lg font-medium transition-colors ${
                selected === item.key
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted/50 text-foreground/80'
              } ${isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3'}`}
              onClick={() => handleNavigation(item.key)}
              title={isCollapsed ? item.label : undefined}
              transition={transition}
              variants={variants}
            >
              {item.icon}
              {!isCollapsed && item.label}
            </motion.button>
          ))}
        </motion.nav>
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
