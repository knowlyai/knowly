import { useState } from 'react'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Pencil, Save } from 'lucide-react'
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
import { Label } from '@/shared/components/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/components/tooltip'
import { DOCUMENT_TYPE } from '@/shared/enums/document-type'
import {
  formatCNPJ,
  formatCPF,
  formatPhone
} from '@/shared/utils/format-documents'
import { Background } from '@/shared/components/background'

// Usuário simulado (como se estivesse logado)
const mockUser: UserInfoData & { id: string } = {
  id: '1',
  name: 'Maria da Silva',
  email: 'maria@email.com',
  documentType: DOCUMENT_TYPE.INDIVIDUAL,
  phone: formatPhone('11912345678'),
  document: '234.781.938-47',
  birthDate: new Date(2001, 7, 12) // Começa no mês 0
}

export function UserInfoPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(mockUser)

  const handleCPFChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    const formattedValue = formatCPF(value)
    onChange(formattedValue)
  }

  const handleCNPJChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    const formattedValue = formatCNPJ(value)
    onChange(formattedValue)
  }

  const handlePhoneChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    const formattedValue = formatPhone(value)
    onChange(formattedValue)
  }

  const form = useForm<UserInfoData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      documentType: user.documentType,
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
      documentType: user.documentType,
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
      documentType: user.documentType,
      document: user.document,
      birthDate: user.birthDate
    })
  }

  function onSubmit(data: UserInfoData) {
    setUser({
      ...user,
      ...data
    })
    setIsEditing(false)
  }

  return (
    <Background>
      <Layout className="h-full w-full">
        <main className="flex flex-col items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            <section>
              <h1 className="text-foreground mb-6 text-center text-2xl font-semibold drop-shadow-xl sm:text-5xl">
                Dados de cadastro
              </h1>
              {!isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label>Nome</Label>
                    <Input value={user.name} disabled />
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Input value={user.email} disabled />
                  </div>
                  <div>
                    <Label>Telefone/Celular</Label>
                    <Input value={user.phone} disabled />
                  </div>
                  <div>
                    <Label>Tipo de Pessoa</Label>
                    <Input
                      value={
                        user.documentType === DOCUMENT_TYPE.INDIVIDUAL
                          ? 'Pessoa física'
                          : 'Pessoa jurídica'
                      }
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Documento</Label>
                    <Input
                      value={
                        user.documentType === DOCUMENT_TYPE.INDIVIDUAL
                          ? formatCPF(user.document)
                          : formatCNPJ(user.document)
                      }
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Data de Nascimento</Label>
                    <Input
                      value={user.birthDate?.toLocaleDateString('pt-BR')}
                      disabled
                    />
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
                <TooltipProvider>
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
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel>Telefone/Celular</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) =>
                                  handlePhoneChange(
                                    e.target.value,
                                    field.onChange
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field: _ }) => (
                          <FormItem>
                            <FormLabel>Tipo de Pessoa</FormLabel>
                            <FormControl>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Input
                                    value={
                                      user.documentType ===
                                      DOCUMENT_TYPE.INDIVIDUAL
                                        ? 'Pessoa física'
                                        : 'Pessoa jurídica'
                                    }
                                    disabled
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Não é possível alterar o tipo de pessoa</p>
                                </TooltipContent>
                              </Tooltip>
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
                            <FormLabel>Documento</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) => {
                                  if (
                                    form.getValues('documentType') ===
                                    'individual'
                                  ) {
                                    handleCPFChange(
                                      e.target.value,
                                      field.onChange
                                    )
                                  } else {
                                    handleCNPJChange(
                                      e.target.value,
                                      field.onChange
                                    )
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {user.documentType === DOCUMENT_TYPE.INDIVIDUAL && (
                        <FormField
                          control={form.control}
                          name="birthDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data de Nascimento</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
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
                      )}
                      <div className="mt-6 flex gap-4">
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
                </TooltipProvider>
              )}
            </section>
          </motion.div>
        </main>
      </Layout>
    </Background>
  )
}
