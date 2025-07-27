import { Button } from '@/shared/components/button'
import { BrainCircuit, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export type SidebarItem = {
  label: string
  icon: React.ReactNode
  key: string
}

const items: SidebarItem[] = [
  { label: 'Dados de cadastro', icon: <User />, key: 'user' },
  { label: 'Minhas bases', icon: <BrainCircuit />, key: 'bases' }
]

export function Sidebar() {
  const navigate = useNavigate()
  const pageUrl = window.location.pathname
  const selected =
    items.find((item) => pageUrl.includes(item.key))?.key || 'user'

  console.log('Selected sidebar item:', selected)

  function handleLogout() {
    // Adicionar lógica de desfazer o login (deslogar o usuário)
    navigate('/')
  }

  function handleNavigation(key: string) {
    navigate(`/${key}`)
  }

  return (
    <motion.aside
      className="bg-background border-border fixed top-16 left-0 z-10 flex h-[calc(100vh-4rem)] w-80 flex-col justify-between border-r px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.key}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
              selected === item.key
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-muted/50 text-foreground/80'
            }`}
            onClick={() => handleNavigation(item.key)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <Button
        variant="ghost"
        className="hover:bg-muted/50 flex items-center gap-2 text-red-600"
        onClick={handleLogout}
      >
        <LogOut className="h-5 w-5" />
        Sair
      </Button>
    </motion.aside>
  )
}
