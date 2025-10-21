import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'
import {
  BookOpen,
  Boxes,
  Database,
  Plug,
  TestTube,
  CreditCard,
  Menu
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/shared/components/button'

export type DocsSidebarItem = {
  label: string
  icon: React.ReactNode
  path: string
}

const docsItems: DocsSidebarItem[] = [
  {
    label: 'Sobre o Projeto',
    icon: <BookOpen className="h-5 w-5" />,
    path: '/docs'
  },
  {
    label: 'Modelos de Fundação',
    icon: <Boxes className="h-5 w-5" />,
    path: '/docs/foundation-models'
  },
  {
    label: 'Bases de Conhecimento',
    icon: <Database className="h-5 w-5" />,
    path: '/docs/knowledge-bases'
  },
  {
    label: 'Integração',
    icon: <Plug className="h-5 w-5" />,
    path: '/docs/integration'
  },
  {
    label: 'Playground e Testes',
    icon: <TestTube className="h-5 w-5" />,
    path: '/docs/playground-testing'
  },
  {
    label: 'Gerenciar Assinatura',
    icon: <CreditCard className="h-5 w-5" />,
    path: '/docs/subscription-management'
  }
]

export function DocsSidebar() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed)
  }

  const transition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  const variants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0)', opacity: 1 }
  }

  return (
    <motion.aside
      className={cn(
        'bg-background/95 border-border fixed top-16 left-0 z-10 flex h-[calc(100vh-4rem)] flex-col border-r-1 backdrop-blur transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
    >
      <div className="flex flex-col gap-2 p-4">
        <motion.div transition={transition} variants={variants}>
          <Button
            variant="ghost"
            className="hover:bg-muted/50 text-foreground mb-2 w-full justify-start"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            {!isCollapsed && <span className="ml-2">Menu</span>}
          </Button>
        </motion.div>

        {!isCollapsed && (
          <motion.div
            className="mt-2 mb-4"
            transition={transition}
            variants={variants}
          >
            <h2 className="text-foreground/60 mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
              Documentação
            </h2>
          </motion.div>
        )}

        <motion.nav className="flex flex-col gap-1">
          {docsItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <motion.div
                key={item.path}
                transition={transition}
                variants={variants}
              >
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted/50 text-foreground/70 hover:text-foreground',
                    isCollapsed && 'justify-center'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </motion.div>
            )
          })}
        </motion.nav>
      </div>
    </motion.aside>
  )
}
