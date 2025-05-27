import {
  SignUpFormData,
  signUpFormInitialValues,
  signUpFormSchema
} from '@/features/sign-up/types/sign-up-schema'
import { Background } from '@/shared/components/background'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/components/card'
import { Button } from '@/shared/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/form'
import { Input } from '@/shared/components/input'
import { Layout } from '@/shared/components/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/shared/components/checkbox'
import { Label } from '@/shared/components/label'
import {
  formatCNPJ,
  formatCPF,
  formatPhone
} from '@/shared/utils/format-documents'
import toast from 'react-hot-toast'
import { BackgroundBlobs } from '@/shared/components/background-blobs'

export function SignUpPage() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormInitialValues,
    mode: 'onBlur'
  })

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

  function onSubmit(values: SignUpFormData) {
    console.log(values)
    toast.success('Conta criada com sucesso!')
  }

  return (
    <Background className="relative isolate overflow-hidden py-32">
      <BackgroundBlobs />
      <Layout>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full items-center justify-center"
          >
            <Card className="w-11/12 max-w-2xl sm:w-4/5 md:w-2/3">
              <CardHeader>
                <CardTitle>Registre-se</CardTitle>
                <CardDescription>Crie uma conta, é grátis!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
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
                      <FormLabel>Email</FormLabel>
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
                          onChange={(e) => {
                            handlePhoneChange(e.target.value, field.onChange)
                          }}
                          placeholder="(11) 95320-2121"
                          maxLength={15}
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Tipo de pessoa</FormLabel>
                      <FormControl>
                        <div className="mt-4 flex justify-center gap-8">
                          <Label
                            htmlFor="type-individual"
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id="type-individual"
                              checked={field.value === 'individual'}
                              onCheckedChange={() =>
                                field.onChange('individual')
                              }
                            />
                            Pessoa física
                          </Label>
                          <Label
                            htmlFor="type-business"
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id="type-business"
                              checked={field.value === 'business'}
                              onCheckedChange={() => field.onChange('business')}
                            />
                            Pessoa jurídica
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        {form.getValues('documentType') === 'individual'
                          ? 'CPF'
                          : 'CNPJ'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            if (
                              form.getValues('documentType') === 'individual'
                            ) {
                              handleCPFChange(e.target.value, field.onChange)
                            } else {
                              handleCNPJChange(e.target.value, field.onChange)
                            }
                          }}
                          placeholder={
                            form.getValues('documentType') === 'individual'
                              ? '000.000.000-00'
                              : '00.000.000/0000-00'
                          }
                          maxLength={
                            form.getValues('documentType') === 'individual'
                              ? 14
                              : 18
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.getValues('documentType') === 'individual' && (
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de nascimento</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="[&::-webkit-calendar-picker-indicator]:hidden"
                            onChange={(e) => {
                              const dateValue = e.target.value
                                ? new Date(e.target.value)
                                : undefined
                              field.onChange(dateValue)
                              field.onBlur()
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirme sua senha</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="justify-center">
                <Button type="submit">Criar conta</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </Layout>
    </Background>
  )
}
