import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'
import { SidebarProvider } from '@/components/ui/sidebar'
import { MainSidebar, SidebarItem } from '@/shared/components/sidebar'
import { User, BrainCircuit, Wallet, LogOut } from 'lucide-react'

export function UserAreaPageWithSidebar() {
  const navigate = useNavigate()

  const items: SidebarItem[] = [
    { label: 'Dados de cadastro', icon: <User />, key: 'user' },
    { label: 'Minhas bases', icon: <BrainCircuit />, key: 'bases' },
    { label: 'Assinatura', icon: <Wallet />, key: 'subscription' }
  ]

  function handleLogout() {
    // Adicionar lógica de desfazer o login (deslogar o usuário)
    navigate('/')
  }

  const logout: SidebarItem = {
    label: 'Sair',
    icon: <LogOut />,
    key: '/',
    variant: 'red_centered',
    onClick: handleLogout
  }

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className="mt-18 flex min-h-screen w-full">
        <SidebarProvider>
          <MainSidebar items={items} footer={logout} />
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
