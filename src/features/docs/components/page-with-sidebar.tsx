import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'
import { SidebarProvider } from '@/components/ui/sidebar'
import {
  MainSidebar,
  SidebarItem,
  SidebarSections
} from '@/shared/components/sidebar'
import {
  Brain,
  Bot,
  ChevronsLeftRightEllipsis,
  Castle,
  BrainCircuit,
  Wallet
} from 'lucide-react'

export function DocsPageWithSidebar() {
  const items_doc: SidebarItem[] = [
    { label: 'Sobre o projeto', icon: <Brain />, key: 'project' },
    { label: 'Modelos de fundação', icon: <Bot />, key: 'models' },
    {
      label: 'Como integrar',
      icon: <ChevronsLeftRightEllipsis />,
      key: 'integration'
    }
  ]

  const items_user: SidebarItem[] = [
    { label: 'Testes em playground', icon: <Castle />, key: 'tests' },
    {
      label: 'Bases de conhecimento',
      icon: <BrainCircuit />,
      key: 'edit-bases'
    },
    { label: 'Gerenciar assinatura', icon: <Wallet />, key: 'plan' }
  ]

  const sections: SidebarSections[] = [
    {
      label: 'Documentação',
      items: items_doc
    },
    {
      label: 'Área do Usuário',
      items: items_user
    }
  ]

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className="mt-18 flex min-h-screen w-full">
        <SidebarProvider>
          <MainSidebar
            sections={sections}
            variant="sidebar"
            showTrigger={false}
          />
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
