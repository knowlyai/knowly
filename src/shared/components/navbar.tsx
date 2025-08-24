import brain from '@/assets/brain.png'
import { Button } from '@/shared/components/button'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/components/dropdown-menu'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '@/shared/hooks/use-theme'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
const variants = {
  hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
  visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 }
}

export function Navbar() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Determine if user is logged in based on presence of token in localStorage
  const isLoggedIn = Boolean(localStorage.getItem('access_token'))

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className="text-foreground fixed inset-0 z-50 flex h-18 w-full items-center justify-center"
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
    >
      <div className="flex w-full max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-12">
        <motion.div
          className="bg-background/80 absolute inset-0 -z-10 h-full w-full border-b-[1px] border-gray-100/20 backdrop-blur-sm transition-all duration-500"
          transition={transition}
          variants={variants}
        />

        {/* Logo */}
        <motion.div
          className="flex cursor-pointer items-center justify-center gap-3 sm:gap-4"
          transition={transition}
          variants={variants}
          onClick={() =>
            navigate('/', {
              replace: true
            })
          }
        >
          <img src={brain} alt="Brain" className="w-10 sm:w-14" />
          <a href="#home" className="text-base sm:text-lg">
            Knowly
          </a>
        </motion.div>

        {/* Desktop Menu */}
        <motion.div
          className="hidden items-center gap-6 lg:flex lg:gap-8"
          transition={transition}
          variants={variants}
        >
          <a
            href="/#how-knowly-works"
            className="hover:text-primary transition-colors"
          >
            Nosso produto
          </a>
          <a href="/#pricing" className="hover:text-primary transition-colors">
            Preços
          </a>
          <a href="/faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
          <a href="/#about-us" className="hover:text-primary transition-colors">
            Sobre nós
          </a>
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
          <Button
            className="px-6"
            variant="secondary"
            onClick={() => navigate(isLoggedIn ? '/bases' : '/login')}
          >
            {isLoggedIn ? 'Minhas bases' : 'Login'}
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div
          className="flex items-center gap-3 lg:hidden"
          transition={transition}
          variants={variants}
        >
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

          <Button
            variant="secondary"
            className="px-6"
            onClick={() => navigate(isLoggedIn ? '/bases' : '/login')}
          >
            {isLoggedIn ? 'Minhas bases' : 'Login'}
          </Button>

          <button
            onClick={toggleMobileMenu}
            className="hover:text-primary p-1 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="bg-background/95 fixed inset-0 top-18 z-40 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex h-full flex-col items-center justify-start gap-8 pt-16"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              <motion.a
                href="/#how-knowly-works"
                className="hover:text-primary text-xl transition-colors"
                onClick={closeMobileMenu}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                Nosso produto
              </motion.a>
              <motion.a
                href="/#pricing"
                className="hover:text-primary text-xl transition-colors"
                onClick={closeMobileMenu}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                Preços
              </motion.a>
              <motion.a
                href="/faq"
                className="hover:text-primary text-xl transition-colors"
                onClick={closeMobileMenu}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                FAQ
              </motion.a>
              <motion.a
                href="/#about-us"
                className="hover:text-primary text-xl transition-colors"
                onClick={closeMobileMenu}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                Sobre nós
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
