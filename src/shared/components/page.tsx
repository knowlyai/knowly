import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
export function Page() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
