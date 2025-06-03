import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { BrainCircuit, User, Pencil, X } from 'lucide-react'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'
import { Button } from '@/shared/components/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userInfoSchema, UserInfoData } from '../types/user-info-schema'

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
    birthDate: new Date('09-08-2001')
  },
  {
    id: '2',
    name: 'João Souza',
    email: 'joao@email.com',
    documentType: 'CPF',
    phone: '11912345678',
    document: '23478193847',
    birthDate: new Date('10-09-2001')
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

  const user = mockUsers.find((u) => u.id === userId) || mockUsers[0]
  const [edit, setEdit] = useState({
    name: false,
    email: false,
    phone: false,
    documentType: false,
    document: false,
    birthDate: false
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty }
  } = useForm<UserInfoData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      documentType: user.documentType === 'CPF' ? 'individual' : 'business',
      document: user.document,
      birthDate: new Date(user.birthDate)
    }
  })

  function handleCancel(field: keyof UserInfoData) {
    if (field === 'birthDate') {
      setValue(
        'birthDate',
        new Date(user.birthDate) as UserInfoData['birthDate']
      )
    } else if (field === 'documentType') {
      setValue(
        'documentType',
        user.documentType === 'CPF' ? 'individual' : 'business'
      )
    } else {
      setValue(field, user[field as keyof typeof user] as string)
    }
    setEdit((prev) => ({ ...prev, [field]: false }))
  }

  // Função para ativar edição de um campo
  function handleEdit(field: keyof UserInfoData) {
    setEdit((prev) => ({ ...prev, [field]: true }))
  }

  function onSubmit(data: UserInfoData) {
    // Aqui você pode enviar para o backend
    setEdit({
      name: false,
      email: false,
      phone: false,
      documentType: false,
      document: false,
      birthDate: false
    })
    // Exemplo: atualizar mockUsers (apenas para teste)
    const idx = mockUsers.findIndex((u) => u.id === user.id)
    if (idx !== -1) {
      mockUsers[idx] = {
        ...mockUsers[idx],
        ...data,
        documentType: data.documentType === 'individual' ? 'CPF' : 'CNPJ'
      }
    }
  }
  if (!user) {
    return (
      <Layout className="bg-background min-h-screen min-w-screen">
        <main className="mt-24 flex flex-1 items-center justify-center">
          <h1 className="text-foreground text-2xl font-semibold">
            Usuário não encontrado
          </h1>
        </main>
      </Layout>
    )
  }

  return (
    <Layout className="bg-background min-h-screen min-w-screen">
      <Sidebar
        items={sidebarItems}
        selected={selected}
        setSelected={setSelected}
        onLogout={() => navigate('/')}
      />
      <main className="mt-24 flex flex-1 flex-col items-center justify-center p-12">
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
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Nome
                  </label>
                  <div className="relative flex items-center">
                    <input
                      {...register('name')}
                      type="text"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        edit.name ? 'bg-muted/40' : ''
                      }`}
                      disabled={!edit.name}
                    />
                    {edit.name ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleCancel('name')}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleEdit('name')}
                        tabIndex={-1}
                        aria-label="Editar nome"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                  {errors.name && (
                    <span className="text-destructive text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    E-mail
                  </label>
                  <div className="relative flex items-center">
                    <input
                      {...register('email')}
                      type="email"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        edit.email ? 'bg-muted/40' : ''
                      }`}
                      disabled={!edit.email}
                    />
                    {edit.email ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleCancel('email')}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleEdit('email')}
                        tabIndex={-1}
                        aria-label="Editar e-mail"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                  {errors.email && (
                    <span className="text-destructive text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Telefone
                  </label>
                  <div className="relative flex items-center">
                    <input
                      {...register('phone')}
                      type="text"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        edit.phone ? 'bg-muted/40' : ''
                      }`}
                      disabled={!edit.phone}
                    />
                    {edit.phone ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleCancel('phone')}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleEdit('phone')}
                        tabIndex={-1}
                        aria-label="Editar telefone"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                  {errors.phone && (
                    <span className="text-destructive text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Tipo de Pessoa
                  </label>
                  <div className="relative flex items-center">
                    <select
                      {...register('documentType')}
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        edit.documentType ? 'bg-muted/40' : ''
                      }`}
                      disabled={!edit.documentType}
                    >
                      <option value="individual">Pessoa Física</option>
                      <option value="business">Pessoa Jurídica</option>
                    </select>
                    {edit.documentType ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleCancel('documentType')}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleEdit('documentType')}
                        tabIndex={-1}
                        aria-label="Editar tipo de pessoa"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                  {errors.documentType && (
                    <span className="text-destructive text-sm">
                      {errors.documentType.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Documento
                  </label>
                  <div className="relative flex items-center">
                    <input
                      {...register('document')}
                      type="text"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        edit.document ? 'bg-muted/40' : ''
                      }`}
                      disabled={!edit.document}
                    />
                    {edit.document ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleCancel('document')}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleEdit('document')}
                        tabIndex={-1}
                        aria-label="Editar documento"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                  {errors.document && (
                    <span className="text-destructive text-sm">
                      {errors.document.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-foreground/80 mb-1 block text-lg font-medium">
                    Data de Nascimento
                  </label>
                  <div className="relative flex items-center">
                    <input
                      {...register('birthDate')}
                      type="date"
                      className={`border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 pr-10 text-xl transition-colors ${
                        edit.birthDate ? 'bg-muted/40' : ''
                      }`}
                      disabled={!edit.birthDate}
                    />
                    {edit.birthDate ? (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleCancel('birthDate')}
                        tabIndex={-1}
                        aria-label="Cancelar edição"
                      >
                        <X size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => handleEdit('birthDate')}
                        tabIndex={-1}
                        aria-label="Editar data de nascimento"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </div>
                  {errors.birthDate && (
                    <span className="text-destructive text-sm">
                      {errors.birthDate.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  className="mt-6 w-full text-lg"
                  disabled={!isDirty}
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
            </section>
          )}
        </motion.div>
      </main>
    </Layout>
  )
}

export default UserInfoPage
