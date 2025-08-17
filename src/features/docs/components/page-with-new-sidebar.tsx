import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'
import { NewSidebar } from '@/shared/components/new-sidebar'
import { Brain, Bot, ChevronsLeftRightEllipsis, Castle, BrainCircuit, Wallet } from 'lucide-react'



export function TestPageWithSidebar() {
  const location = useLocation()

  const items = [
    { label: 'Sobre o projeto', icon: <Brain />, key: 't1' },
    { label: 'Modelos de fundação', icon: <Bot />, key: 't2' },
    { label: 'Como integrar', icon: <ChevronsLeftRightEllipsis />, key: 't3' },
    { label: 'Testes em playground', icon: <Castle />, key: 't4' },
    { label: 'Bases de conhecimento', icon: <BrainCircuit />, key: 't5' },
    { label: 'Gerenciar assinatura', icon: <Wallet />, key: 't6' }
  ]

  // Detect selected key based on current path
  const selectedKey = items.find((item) =>
    location.pathname.startsWith(`/${item.key}`)
  )?.key

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className="flex w-full mt-18">
        <NewSidebar items={items} />
        <Outlet />
      </div>
    </>
  )
}
