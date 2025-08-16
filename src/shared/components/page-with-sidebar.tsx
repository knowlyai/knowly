import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'
import { Sidebar } from '@/shared/components/user-area-sidebar'

export function PageWithSidebar() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className="flex h-screen w-full pt-18">
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}
