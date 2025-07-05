import { Button } from '@/shared/components/button'
import { LogOut } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export type SidebarItem = {
  label: string
  icon: React.ReactNode
  key: string
}

type SidebarProps = {
  items: SidebarItem[]
  selected: string
  setSelected: (key: string) => void
}

export function Sidebar({ items, selected, setSelected }: SidebarProps) {
  const navigate = useNavigate()

  function handleLogout() {
    // Adicionar lógica de desfazer o login (deslogar o usuário)
    navigate('/')
  }

  return (
    <aside className="bg-background border-border fixed top-16 left-0 z-10 flex h-[calc(100vh-4rem)] w-80 flex-col justify-between border-r px-4 py-8">
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.key}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
              selected === item.key
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-muted/50 text-foreground/80'
            }`}
            onClick={() => setSelected(item.key)}
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
    </aside>
  )
}
