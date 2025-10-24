import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { BackgroundBlobs } from '@/shared/components/background-blobs'
import {
  LoginFormData,
  loginFormInitialValues,
  loginFormSchema
} from '@/features/login/types/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/components/card'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from '@/shared/components/form'
import { Input } from '@/shared/components/input'
import { Checkbox } from '@/shared/components/checkbox'
import { Link, useNavigate } from 'react-router-dom'
import { containerVariants, cardVariants } from '@/shared/utils/animations'
import { useLoginUserMutation } from '@/shared/hooks/use-user'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

const REMEMBER_EMAIL_KEY = 'knowly_remember_email'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberEmail, setRememberEmail] = useState(false)
  const { mutateAsync: loginUser, isPending } = useLoginUserMutation()
  const navigate = useNavigate()

  // Get saved email before initializing form
  const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      ...loginFormInitialValues,
      email: savedEmail || loginFormInitialValues.email
    },
    mode: 'onBlur'
  })

  // Set checkbox state on mount
  useEffect(() => {
    if (savedEmail) {
      setRememberEmail(true)
    }
  }, [savedEmail])

  const onSubmit = async (values: LoginFormData) => {
    try {
      // Save or remove email from localStorage based on checkbox
      if (rememberEmail) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, values.email)
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY)
      }

      const response = await loginUser(values)
      localStorage.setItem('token', response.id_token)
      localStorage.setItem('refresh_token', response.refresh_token)
      toast.success('Login realizado com sucesso!')
      navigate('/bases', {
        replace: true
      })
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError && err.response?.data?.message
          ? err.response.data.message
          : 'Erro ao fazer login'
      toast.error(errorMessage)
    }
  }

  return (
    <Background className="relative isolate overflow-hidden">
      <BackgroundBlobs />
      <Layout>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full items-center justify-center"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
          >
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Seja bem-vindo!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {!showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                        <div className="mt-2 flex w-full justify-end">
                          <Link
                            to="/forgot-password"
                            className="text-primary w-full text-right text-sm hover:underline"
                          >
                            Esqueci minha senha
                          </Link>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Remember Email Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-email"
                      checked={rememberEmail}
                      onCheckedChange={(checked) =>
                        setRememberEmail(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="remember-email"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Lembrar e-mail
                    </label>
                  </div>

                  <CardFooter className="flex flex-col items-center justify-center pt-4 pb-0">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? 'Entrando...' : 'Login'}
                    </Button>
                    <div className="text-foreground/70 mt-2 text-center text-sm">
                      Ainda não tem uma conta?{' '}
                      <a
                        href="/sign-up"
                        className="text-primary font-medium hover:underline"
                      >
                        Cadastre-se aqui
                      </a>
                    </div>
                  </CardFooter>
                </CardContent>
              </Card>
            </motion.div>
          </motion.form>
        </Form>
      </Layout>
    </Background>
  )
}
