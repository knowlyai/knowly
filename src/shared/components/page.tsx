import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'

export function Page() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <Outlet />
    </>
  )
}
