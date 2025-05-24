import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { BrainCircuit, User, Pencil } from 'lucide-react'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'
import { Button } from '@/shared/components/button'

// Mock de usuários para testes
const mockUsers = [
  { id: '1', nome: 'Maria da Silva', email: 'maria@email.com' },
  { id: '2', nome: 'João Souza', email: 'joao@email.com' }
]

const sidebarItems: SidebarItem[] = [
  { label: 'Dados de cadastro', icon: <User />, key: 'dados' },
  { label: 'Minhas bases', icon: <BrainCircuit />, key: 'bases' }
]

export function UserInfoPage() {
  const { userId } = useParams<{ userId: string }>()
  const [selected, setSelected] = useState('dados')
  const navigate = useNavigate()

  // Simula busca do usuário pelo id da URL
  const user = mockUsers.find((u) => u.id === userId) || mockUsers[0]
  // Estados de edição
  const [editNome, setEditNome] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [nome, setNome] = useState(user.nome)
  const [email, setEmail] = useState(user.email)

  return (
    <Layout className="bg-background min-h-screen min-w-screen">
      <Sidebar
        items={sidebarItems}
        selected={selected}
        setSelected={setSelected}
        onLogout={() => navigate('/')}
      />
      <main className="flex flex-1 flex-col items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          {selected === 'dados' && (
            <section>
              <h1 className="text-foreground mb-6 text-center text-4xl font-semibold drop-shadow-xl sm:text-6xl">
                Dados de cadastro
              </h1>
              <form className="space-y-6">
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Nome
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl"
                      placeholder="Seu nome"
                      value={nome}
                      disabled={!editNome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={() => setEditNome((v) => !v)}
                      tabIndex={-1}
                    >
                      <Pencil size={20} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    E-mail
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl"
                      placeholder="seu@email.com"
                      value={email}
                      disabled={!editEmail}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={() => setEditEmail((v) => !v)}
                      tabIndex={-1}
                    >
                      <Pencil size={20} />
                    </button>
                  </div>
                </div>
                <Button type="submit" className="mt-6 w-full text-lg">
                  Salvar
                </Button>
              </form>
            </section>
          )}
          {selected === 'bases' && (
            <section>
              <h1 className="text-foreground mb-6 text-center text-4xl font-semibold drop-shadow-xl sm:text-6xl">
                Minhas bases
              </h1>
              <p className="text-foreground/70 text-center text-xl">
                Aqui você verá suas bases cadastradas.
              </p>
              {/* Adicione aqui a listagem das bases do usuário */}
            </section>
          )}
        </motion.div>
      </main>
    </Layout>
  )
}

export default UserInfoPage
