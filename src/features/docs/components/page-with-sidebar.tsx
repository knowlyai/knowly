import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'
import { User, BrainCircuit, Wallet } from 'lucide-react'

export function DocsPageWithSidebar() {
  const location = useLocation()

  const items: SidebarItem[] = [
    { label: 'Sobre o projeto', icon: <User />, key: 'project' },
    { label: 'Modelos de fundação', icon: <BrainCircuit />, key: 'models' },
    { label: 'Como integrar', icon: <Wallet />, key: 'integration' },
    { label: 'Testes', icon: <BrainCircuit />, key: 'tests' },
    { label: 'Bases de conhecimento', icon: <BrainCircuit />, key: 'bases' },
    { label: 'Gerenciar assinatura', icon: <BrainCircuit />, key: 'plan' }
  ]

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
