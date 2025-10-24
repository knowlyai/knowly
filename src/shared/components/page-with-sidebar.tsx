import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'
import { Sidebar } from '@/shared/components/sidebar'
import { UserProvider } from '@/shared/contexts/user-context'

export function PageWithSidebar() {
  return (
    <UserProvider>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        containerClassName="mb-16 md:mb-0"
      />
      <Navbar />
      <Sidebar />
      <Outlet />
    </UserProvider>
  )
}
