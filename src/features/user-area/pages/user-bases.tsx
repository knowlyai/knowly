import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { BrainCircuit, User } from 'lucide-react'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'

// Sidebar items
const sidebarItems: SidebarItem[] = [
  { label: 'Dados de cadastro', icon: <User />, key: 'dados' },
  { label: 'Minhas bases', icon: <BrainCircuit />, key: 'bases' }
]

export function UserBasesPage() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const selected = 'bases'

  function handleSidebarSelect(key: string) {
    if (key === 'dados') {
      navigate(`/user-info/${userId}`)
    }
    // Se já está em "bases", não faz nada
  }

  return (
    <Layout className="bg-background min-h-screen min-w-screen">
      <Sidebar
        items={sidebarItems}
        selected={selected}
        setSelected={handleSidebarSelect}
        onLogout={() => navigate('/')}
      />
      <main className="justify-top mt-20 flex flex-1 flex-col items-center p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          <section>
            <h1 className="text-foreground mb-6 text-center text-4xl font-semibold drop-shadow-xl sm:text-6xl">
              Minhas bases
            </h1>
            <p className="text-foreground/70 text-center text-xl">
              Aqui você verá suas bases cadastradas.
            </p>
            {/* Adicione aqui a listagem das bases do usuário */}
          </section>
        </motion.div>
      </main>
    </Layout>
  )
}

export default UserBasesPage
