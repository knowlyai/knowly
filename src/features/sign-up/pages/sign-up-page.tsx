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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/components/tooltip'
import { Input } from '@/shared/components/input'
import { Layout } from '@/shared/components/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Calendar as CalendarIcon, Info } from 'lucide-react'
import { Calendar } from '@/shared/components/calendar'
import { Checkbox } from '@/shared/components/checkbox'
import { Label } from '@/shared/components/label'
import { cn } from '@/shared/utils/cn'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/shared/components/popover'
import { format } from 'date-fns'

export function SignUpPage() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormInitialValues,
    mode: 'onBlur'
  })

  return (
    <Background>
      <Layout>
        <Form {...form}>
          <Card className="w-1/2">
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de usuário</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription className="flex items-center gap-1">
                      Esse será o usuário que você usará para fazer login.
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger>
                            <Info size={14} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Não é permitido espaços, símbolos e acentos. Use
                              pontos, hífen e <i>underline</i>.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormDescription>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tipo de pessoa</FormLabel>
                    <FormControl>
                      <div className="flex gap-8">
                        <Label
                          htmlFor="type-individual"
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id="type-individual"
                            checked={field.value === 'individual'}
                            onCheckedChange={() => field.onChange('individual')}
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
                      {form.getValues('type') === 'individual' ? 'CPF' : 'CNPJ'}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.getValues('type') === 'individual' && (
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Data de nascimento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-1/2 justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, 'dd/MM/yyyy')
                              : 'Escolha uma data'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value || '')}
                            onSelect={(date) => {
                              field.onChange(date)
                              form.trigger('birthDate')
                            }}
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  console.log(
                    form.getValues('birthDate')?.toLocaleDateString('pt-BR')
                  )
                }}
              >
                console
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </Layout>
    </Background>
  )
}
