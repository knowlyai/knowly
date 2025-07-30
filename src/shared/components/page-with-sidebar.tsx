import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'
import { Sidebar } from '@/shared/components/sidebar'

export function PageWithSidebar() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  )
}
