import { useState } from 'react'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { BrainCircuit, User, Pencil, Save } from 'lucide-react'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'
import { Button } from '@/shared/components/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userInfoSchema, UserInfoData } from '../types/user-info-schema'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/shared/components/form'
import { Input } from '@/shared/components/input'

const sidebarItems: SidebarItem[] = [
  { label: 'Dados de cadastro', icon: <User />, key: 'dados' },
  { label: 'Minhas bases', icon: <BrainCircuit />, key: 'bases' }
]

// Usuário simulado (como se estivesse logado)
const mockUser = {
  id: '1',
  name: 'Maria da Silva',
  email: 'maria@email.com',
  documentType: 'CPF',
  phone: '11912345678',
  document: '234.781.938-47',
  birthDate: new Date('2001-08-09')
}

export function UserInfoPage() {
  const [selected, setSelected] = useState('dados')
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(mockUser)

  const form = useForm<UserInfoData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      documentType: user.documentType === 'CPF' ? 'individual' : 'business',
      document: user.document,
      birthDate: user.birthDate
    },
    mode: 'onBlur'
  })

  function handleEdit() {
    setIsEditing(true)
    form.reset({
      name: user.name,
      email: user.email,
      phone: user.phone,
      documentType: user.documentType === 'CPF' ? 'individual' : 'business',
      document: user.document,
      birthDate: user.birthDate
    })
  }

  function handleCancel() {
    setIsEditing(false)
    form.reset({
      name: user.name,
      email: user.email,
      phone: user.phone,
      documentType: user.documentType === 'CPF' ? 'individual' : 'business',
      document: user.document,
      birthDate: user.birthDate
    })
  }

  function onSubmit(data: UserInfoData) {
    setUser({
      ...user,
      ...data,
      documentType: data.documentType === 'individual' ? 'CPF' : 'CNPJ'
    })
    setIsEditing(false)
  }

  return (
    <Layout className="bg-background min-h-screen min-w-screen">
      <Sidebar
        items={sidebarItems}
        selected={selected}
        setSelected={setSelected}
        onLogout={() => {
          /* logout logic */
        }}
      />
      <main className="mt-24 flex flex-1 flex-col items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          <section>
            <h1 className="text-foreground mb-6 text-center text-4xl font-semibold drop-shadow-xl sm:text-6xl">
              Dados de cadastro
            </h1>
            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80 block text-lg font-medium">
                      Nome
                    </span>
                  </div>
                  <div className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl">
                    {user.name}
                  </div>
                </div>
                <div>
                  <span className="text-foreground/80 block text-lg font-medium">
                    E-mail
                  </span>
                  <div className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl">
                    {user.email}
                  </div>
                </div>
                <div>
                  <span className="text-foreground/80 block text-lg font-medium">
                    Telefone/Celular
                  </span>
                  <div className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl">
                    {user.phone}
                  </div>
                </div>
                <div>
                  <span className="text-foreground/80 block text-lg font-medium">
                    Tipo de Pessoa
                  </span>
                  <div className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl">
                    {user.documentType === 'CPF'
                      ? 'Pessoa Física'
                      : 'Pessoa Jurídica'}
                  </div>
                </div>
                <div>
                  <span className="text-foreground/80 block text-lg font-medium">
                    Documento
                  </span>
                  <div className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl">
                    {user.document}
                  </div>
                </div>
                <div>
                  <span className="text-foreground/80 block text-lg font-medium">
                    Data de Nascimento
                  </span>
                  <div className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl">
                    {user.birthDate
                      ? user.birthDate.toLocaleDateString('pt-BR')
                      : user.birthDate}
                  </div>
                </div>
                <Button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2"
                  onClick={handleEdit}
                >
                  <Pencil size={20} /> Editar perfil
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 block text-lg font-medium">
                          Nome
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 block text-lg font-medium">
                          E-mail
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 block text-lg font-medium">
                          Telefone/Celular
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 block text-lg font-medium">
                          Tipo de Pessoa
                        </FormLabel>
                        <FormControl className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl">
                          <select
                            {...field}
                            className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl"
                          >
                            <option
                              className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl"
                              value="individual"
                            >
                              Pessoa Física
                            </option>
                            <option
                              className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl"
                              value="business"
                            >
                              Pessoa Jurídica
                            </option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="document"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 block text-lg font-medium">
                          Documento
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 block text-lg font-medium">
                          Data de Nascimento
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="border-border bg-background text-foreground/90 w-full rounded border px-3 py-2 text-xl"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split('T')[0]
                                : ''
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-1/2"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="flex w-1/2 items-center justify-center gap-2"
                    >
                      <Save size={20} /> Salvar
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </section>
        </motion.div>
      </main>
    </Layout>
  )
}
