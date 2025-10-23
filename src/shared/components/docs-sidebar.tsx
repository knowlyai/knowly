import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'
import {
  BookOpen,
  Boxes,
  Database,
  Plug,
  TestTube,
  CreditCard,
  Menu,
  X,
  Rocket,
  ChevronDown,
  ChevronRight,
  TrendingUp
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/shared/components/button'

export type DocsSidebarSubItem = {
  label: string
  path: string
}

export type DocsSidebarItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  path: string
  subItems?: DocsSidebarSubItem[]
}

const docsItems: DocsSidebarItem[] = [
  {
    label: 'Sobre o Projeto',
    icon: BookOpen,
    path: '/docs'
  },
  {
    label: 'Comece a Usar',
    icon: Rocket,
    path: '/docs/getting-started'
  },
  {
    label: 'Modelos de Fundação',
    icon: Boxes,
    path: '/docs/foundation-models'
  },
  {
    label: 'Bases de Conhecimento',
    icon: Database,
    path: '/docs/knowledge-bases'
  },
  {
    label: 'Integração',
    icon: Plug,
    path: '/docs/integration',
    subItems: [
      {
        label: 'API',
        path: '/docs/integration/api'
      },
      {
        label: 'WhatsApp Business',
        path: '/docs/integration/whatsapp'
      },
      {
        label: 'Instagram',
        path: '/docs/integration/instagram'
      }
    ]
  },
  {
    label: 'Playground e Testes',
    icon: TestTube,
    path: '/docs/playground-testing'
  },
  {
    label: 'Gerenciar Assinatura',
    icon: CreditCard,
    path: '/docs/subscription-management'
  },
  {
    label: 'Próximos Passos',
    icon: TrendingUp,
    path: '/docs/next-steps'
  }
]

export function DocsSidebar() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed)
  }

  function toggleMobileSidebar() {
    setIsMobileOpen(!isMobileOpen)
  }

  function closeMobileSidebar() {
    setIsMobileOpen(false)
  }

  function toggleExpanded(path: string) {
    setExpandedItems((prev) =>
      prev.includes(path)
        ? prev.filter((p) => p !== path)
        : [...prev, path]
    )
  }

  // Auto-expand parent if sub-item is active
  useEffect(() => {
    docsItems.forEach((item) => {
      if (item.subItems) {
        const hasActiveSubItem = item.subItems.some(
          (subItem) => location.pathname === subItem.path
        )
        if (hasActiveSubItem && !expandedItems.includes(item.path)) {
          setExpandedItems((prev) => [...prev, item.path])
        }
      }
    })
  }, [location.pathname])

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  const transition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  const variants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0)', opacity: 1 }
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        className="hover:bg-muted/50 text-foreground fixed top-20 left-4 z-50 md:hidden"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background/80 fixed inset-0 top-16 z-40 backdrop-blur-sm md:hidden"
            onClick={closeMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'bg-background/95 fixed top-16 left-0 z-30 flex h-[calc(100vh-4rem)] flex-col border-r-1 border-gray-100/20 backdrop-blur transition-all duration-300',
          // Desktop styles
          'hidden md:flex',
          isCollapsed ? 'md:w-20' : 'md:w-64',
          // Mobile styles
          isMobileOpen && 'flex w-64'
        )}
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.04 }}
        animate={isMobileOpen ? { x: 0 } : { x: 0 }}
      >
        <div className="flex flex-col gap-2 p-4">
          {/* Desktop collapse button */}
          <motion.div
            transition={transition}
            variants={variants}
            className="hidden md:block"
          >
            <Button
              variant="ghost"
              className="hover:bg-muted/50 text-foreground mb-2 w-full justify-start"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
              {!isCollapsed && <span className="ml-2">Menu</span>}
            </Button>
          </motion.div>

          {/* Mobile close button */}
          <motion.div
            transition={transition}
            variants={variants}
            className="block md:hidden"
          >
            <Button
              variant="ghost"
              className="hover:bg-muted/50 text-foreground mb-2 w-full justify-between"
              onClick={closeMobileSidebar}
            >
              <span>Menu</span>
              <X className="h-5 w-5" />
            </Button>
          </motion.div>

          {(!isCollapsed || isMobileOpen) && (
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
              const isExpanded = expandedItems.includes(item.path)
              const hasSubItems = item.subItems && item.subItems.length > 0
              const IconComponent = item.icon
              
              return (
                <motion.div
                  key={item.path}
                  transition={transition}
                  variants={variants}
                >
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive && !hasSubItems
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted/50 text-foreground/70 hover:text-foreground',
                      isCollapsed && 'md:justify-center md:px-2',
                      hasSubItems && 'cursor-pointer'
                    )}
                    onClick={() => {
                      if (hasSubItems) {
                        toggleExpanded(item.path)
                      }
                    }}
                  >
                    {hasSubItems ? (
                      <>
                        <IconComponent
                          className={cn(
                            'flex-shrink-0',
                            isCollapsed ? 'h-6 w-6' : 'h-5 w-5'
                          )}
                        />
                        {(!isCollapsed || isMobileOpen) && (
                          <>
                            <span className="flex-1">{item.label}</span>
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className="flex w-full items-center gap-3"
                      >
                        <IconComponent
                          className={cn(
                            'flex-shrink-0',
                            isCollapsed ? 'h-6 w-6' : 'h-5 w-5'
                          )}
                        />
                        {(!isCollapsed || isMobileOpen) && (
                          <span>{item.label}</span>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* Sub-items */}
                  {hasSubItems && isExpanded && (!isCollapsed || isMobileOpen) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 mt-1 flex flex-col gap-1"
                    >
                      {item.subItems?.map((subItem) => {
                        const isSubItemActive = location.pathname === subItem.path
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={cn(
                              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                              isSubItemActive
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-muted/50 text-foreground/60 hover:text-foreground'
                            )}
                          >
                            {subItem.label}
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </motion.nav>
        </div>
      </motion.aside>
    </>
  )
}
