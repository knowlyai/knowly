import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Button } from '@/shared/components/button'
import { Toaster } from 'react-hot-toast'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'
import { User, BrainCircuit, Wallet, LogOut } from 'lucide-react'
import { useState } from 'react'

export function UserAreaPageWithSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isCollapsed] = useState(() => {
    try {
      const savedCollapsed = localStorage.getItem('sidebar-collapsed')
      return savedCollapsed ? JSON.parse(savedCollapsed) : false
    } catch {
      return false
    }
  })

  const items: SidebarItem[] = [
    { label: 'Dados de cadastro', icon: <User />, key: 'user' },
    { label: 'Minhas bases', icon: <BrainCircuit />, key: 'bases' },
    { label: 'Assinatura', icon: <Wallet />, key: 'subscription' }
  ]

  function handleLogout() {
    // Adicionar lógica de desfazer o login (deslogar o usuário)
    navigate('/')
  }

  // Detect selected key based on current path
  const selectedKey = items.find((item) =>
    location.pathname.startsWith(`/${item.key}`)
  )?.key

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className="flex h-screen w-full pt-18">
        <Sidebar items={items} selectedKey={selectedKey}>
          <Button
            variant="ghost"
            className={`hover:bg-muted/50 flex w-full items-center text-red-600 ${
              isCollapsed ? 'justify-center px-2 py-3' : 'gap-2 px-4 py-3'
            }`}
            onClick={handleLogout}
            title={isCollapsed ? 'Sair' : undefined}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && 'Sair'}
          </Button>
        </Sidebar>
        <Outlet />
      </div>
    </>
  )
}
