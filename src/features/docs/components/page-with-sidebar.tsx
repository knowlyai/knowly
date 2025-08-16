import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Button } from '@/shared/components/button'
import { Toaster } from 'react-hot-toast'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'
import { User, BrainCircuit, Wallet, LogOut } from 'lucide-react'
import { useState } from 'react'

export function DocsPageWithSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      const savedCollapsed = localStorage.getItem('sidebar-collapsed')
      return savedCollapsed ? JSON.parse(savedCollapsed) : false
    } catch {
      return false
    }
  })

  const items: SidebarItem[] = [
    { label: 'Sobre o projeto', icon: <User />, key: 'project' },
    { label: 'Modelos de fundação', icon: <BrainCircuit />, key: 'models' },
    { label: 'Como integrar', icon: <Wallet />, key: 'integration' },
    { label: 'Testes', icon: <BrainCircuit />, key: 'tests' },
    { label: 'Bases de conhecimento', icon: <BrainCircuit />, key: 'bases' },
    { label: 'Gerenciar assinatura', icon: <BrainCircuit />, key: 'plan' }
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
        <Sidebar items={items} selectedKey={selectedKey}></Sidebar>
        <Outlet />
      </div>
    </>
  )
}
