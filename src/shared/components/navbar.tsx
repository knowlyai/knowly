import brain from '@/assets/brain.png'
import { Button } from '@/shared/components/button'
import { useNavigate } from 'react-router-dom'

export function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="fixed inset-0 z-50 flex h-18 w-full items-center justify-center text-white">
      <div className="flex w-full max-w-[1920px] items-center justify-between px-12">
        <div className="bg-background/30 absolute inset-0 -z-10 h-full w-full border-b-[1px] border-gray-100 bg-black/40 backdrop-blur-sm transition-all duration-500" />
        <div
          className="flex cursor-pointer items-center justify-center gap-4"
          onClick={() =>
            navigate('/', {
              replace: true
            })
          }
        >
          <img src={brain} alt="Brain" className="w-14" />
          <p className="text-lg">Knowly</p>
        </div>
        <div className="flex items-center gap-8">
          <a href="">Our product</a>
          <a href="">About us</a>
          <a href="">Pricing</a>
          <a href="">FAQ</a>
          <Button className="px-6">Login</Button>
        </div>
      </div>
    </nav>
  )
}
