import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from 'react-hot-toast'
import { MainSidebar } from '@/shared/components/sidebar'
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

  const items = [
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
      <div className="mt-18 flex min-h-screen w-full">
        <SidebarProvider>
          <MainSidebar items={items} />
          <main>
            <div className="items-center justify-center">
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      </div>
    </>
  )
}
