import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { BrainCircuit, User, Pencil, X } from 'lucide-react'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'
import { Button } from '@/shared/components/button'

// TODO: Remover mock de usuários e implementar chamada à API para buscar os dados do usuário
// Mock de usuários para testes
const mockUsers = [
  {
    id: '1',
    name: 'Maria da Silva',
    email: 'maria@email.com',
    documentType: 'CPF',
    phone: '11912345678',
    document: '23478193847',
    birthDate: '09-08-2001'
  },
  {
    id: '2',
    name: 'João Souza',
    email: 'joao@email.com',
    documentType: 'CPF',
    phone: '11912345678',
    document: '23478193847',
    birthDate: '09-08-2001'
  }
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
  const [editName, setEditName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [editPhone, setEditPhone] = useState(false)
  const [editDocumentType, setEditDocumentType] = useState(false)
  const [editDocument, setEditDocument] = useState(false)
  const [editBirthDate, setEditBirthDate] = useState(false)
  const [phone, setPhone] = useState(user.phone || '')
  const [documentType, setDocumentType] = useState(
    user.documentType || 'individual'
  )
  const [document, setDocument] = useState(user.document || '')
  const [birthDate, setBirthDate] = useState(user.birthDate || '')

  // Estados para restaurar valor original ao cancelar edição
  const [tempName, setTempName] = useState(user.name)
  const [tempEmail, setTempEmail] = useState(user.email)

  function handleEditName() {
    setTempName(tempName)
    setEditName(true)
  }

  function handleCancelName() {
    setName(user.name)
    setEditName(false)
  }

  function handleEditEmail() {
    setTempEmail(tempEmail)
    setEditEmail(true)
  }

  function handleCancelEmail() {
    setEmail(user.email)
    setEditEmail(false)
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEditName(false)
    setEditEmail(false)

    // TODO: Enviar os dados atualizados para o backend
  }

  return (
    <Layout className="bg-background min-h-screen min-w-screen">
      <Sidebar
        items={sidebarItems}
        selected={selected}
        setSelected={setSelected}
        onLogout={() => navigate('/')}
      />
      <main className="mt-20 flex flex-1 flex-col items-center justify-center p-12">
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Nome
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        editName ? 'bg-muted/40' : ''
                      }`}
                      placeholder="Seu nome"
                      value={name}
                      disabled={!editName}
                      onChange={handleNameChange}
                    />
                    {editName ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={handleCancelName}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={handleEditName}
                        tabIndex={-1}
                        aria-label="Editar nome"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    E-mail
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        editEmail ? 'bg-muted/40' : ''
                      }`}
                      placeholder="seu@email.com"
                      value={email}
                      disabled={!editEmail}
                      onChange={handleEmailChange}
                    />
                    {editEmail ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={handleCancelEmail}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={handleEditEmail}
                        tabIndex={-1}
                        aria-label="Editar e-mail"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Telefone
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        editPhone ? 'bg-muted/40' : ''
                      }`}
                      placeholder="(11) 99999-9999"
                      value={phone}
                      disabled={!editPhone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {editPhone ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => {
                          setPhone(user.phone || '')
                          setEditPhone(false)
                        }}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => setEditPhone(true)}
                        tabIndex={-1}
                        aria-label="Editar telefone"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Tipo de Pessoa
                  </label>
                  <div className="relative flex items-center">
                    <select
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        editDocumentType ? 'bg-muted/40' : ''
                      }`}
                      value={documentType}
                      disabled={!editDocumentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                    >
                      <option value="individual">Pessoa Física</option>
                      <option value="business">Pessoa Jurídica</option>
                    </select>
                    {editDocumentType ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => {
                          setDocumentType(user.documentType || 'individual')
                          setEditDocumentType(false)
                        }}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => setEditDocumentType(true)}
                        tabIndex={-1}
                        aria-label="Editar tipo de pessoa"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Documento
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        editDocument ? 'bg-muted/40' : ''
                      }`}
                      placeholder="Digite o documento"
                      value={document}
                      disabled={!editDocument}
                      onChange={(e) => setDocument(e.target.value)}
                    />
                    {editDocument ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => {
                          setDocument(user.document || '')
                          setEditDocument(false)
                        }}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => setEditDocument(true)}
                        tabIndex={-1}
                        aria-label="Editar documento"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Data de Nascimento
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        editBirthDate ? 'bg-muted/40' : ''
                      }`}
                      value={birthDate}
                      disabled={!editBirthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                    {editBirthDate ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => {
                          setBirthDate(user.birthDate || '')
                          setEditBirthDate(false)
                        }}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => setEditBirthDate(true)}
                        tabIndex={-1}
                        aria-label="Editar data de nascimento"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mt-6 w-full text-lg"
                  disabled={!editName && !editEmail}
                >
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
