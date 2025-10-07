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
import { useUser } from '@/shared/hooks/use-user'

export function UserInfoPage() {
  const [isEditing, setIsEditing] = useState(false)
  const { user, isPending } = useUser()

  const form = useForm<UserInfoData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      cellphone: user?.cellphone || '',
      personType: user?.personType || 'individual',
      cpfCnpj: user?.cpfCnpj || '',
      birthDate: user?.birthDate
    },
    mode: 'onBlur'
  })

  if (isPending || !user) {
    return <div>Loading</div>
  }

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

  function handleEdit() {
    if (!user) return

    setIsEditing(true)
    form.reset({
      name: user.name,
      email: user.email,
      cellphone: user.cellphone,
      personType: user.personType,
      cpfCnpj: user.cpfCnpj,
      birthDate: user.birthDate
    })
  }

  function handleCancel() {
    if (!user) return

    setIsEditing(false)
    form.reset({
      name: user.name,
      email: user.email,
      cellphone: user.cellphone,
      personType: user.personType,
      cpfCnpj: user.cpfCnpj,
      birthDate: user.birthDate
    })
  }

  function onSubmit(data: UserInfoData) {
    const dirtyFields = form.formState.dirtyFields
    const changedData = Object.keys(dirtyFields).reduce((acc, key) => {
      if (dirtyFields[key as keyof UserInfoData]) {
        acc[key as keyof UserInfoData] = data[key as keyof UserInfoData]
      }
      return acc
    }, {} as Partial<UserInfoData>)

    console.log('Changed fields:', changedData)
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
                    <Input value={user.cellphone} disabled />
                  </div>
                  <div>
                    <Label>Tipo de Pessoa</Label>
                    <Input
                      value={
                        user.personType === DOCUMENT_TYPE.INDIVIDUAL
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
                        user.personType === DOCUMENT_TYPE.INDIVIDUAL
                          ? formatCPF(user.cpfCnpj)
                          : formatCNPJ(user.cpfCnpj)
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
                        name="cellphone"
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
                        name="personType"
                        render={({ field: _ }) => (
                          <FormItem>
                            <FormLabel>Tipo de Pessoa</FormLabel>
                            <FormControl>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Input
                                    value={
                                      user.personType ===
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
                        name="cpfCnpj"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Documento</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onChange={(e) => {
                                  if (
                                    form.getValues('personType') ===
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
                      {user.personType === DOCUMENT_TYPE.INDIVIDUAL && (
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
