import brain from '@/assets/brain.png'
import { Button } from '@/shared/components/button'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/components/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/shared/hooks/use-theme'
import { motion } from 'framer-motion'

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
const variants = {
  hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
  visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 }
}

export function Navbar() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  return (
    <motion.nav
      className="text-foreground fixed inset-0 z-50 flex h-18 w-full items-center justify-center"
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
    >
      <div className="flex w-full max-w-[1920px] items-center justify-between px-12">
        <motion.div
          className="bg-background/80 absolute inset-0 -z-10 h-full w-full border-b-[1px] border-gray-100 backdrop-blur-sm transition-all duration-500"
          transition={transition}
          variants={variants}
        />
        <motion.div
          className="flex cursor-pointer items-center justify-center gap-4"
          transition={transition}
          variants={variants}
          onClick={() =>
            navigate('/', {
              replace: true
            })
          }
        >
          <img src={brain} alt="Brain" className="w-14" />
          <a href="#home" className="text-lg">
            Knowly
          </a>
        </motion.div>
        <motion.div
          className="flex items-center gap-8"
          transition={transition}
          variants={variants}
        >
          <a href="#how-knowly-works">Our product</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#about-us">About us</a>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 cursor-pointer" />
              ) : (
                <Moon className="h-5 w-5 cursor-pointer" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="px-6" onClick={() => navigate('/login')}>
            Login
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  )
}
