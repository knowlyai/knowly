import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'
import {
  Brain,
  Bot,
  ChevronsLeftRightEllipsis,
  Castle,
  BrainCircuit,
  Wallet
} from 'lucide-react'

export function DocsPageWithSidebar() {
  const location = useLocation()

  const items: SidebarItem[] = [
    { label: 'Sobre o projeto', icon: <Brain />, key: 'project' },
    { label: 'Modelos de fundação', icon: <Bot />, key: 'models' },
    {
      label: 'Como integrar',
      icon: <ChevronsLeftRightEllipsis />,
      key: 'integration'
    },
    { label: 'Testes em playground', icon: <Castle />, key: 'tests' },
    {
      label: 'Bases de conhecimento',
      icon: <BrainCircuit />,
      key: 'edit-bases'
    },
    { label: 'Gerenciar assinatura', icon: <Wallet />, key: 'plan' }
  ]

  // Detect selected key based on current path
  const selectedKey = items.find((item) =>
    location.pathname.startsWith(`/${item.key}`)
  )?.key

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className="flex w-full pt-18">
        <Sidebar items={items} selectedKey={selectedKey}></Sidebar>
        <Outlet />
      </div>
    </>
  )
}
