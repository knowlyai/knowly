import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { useState } from 'react'
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
import { Link } from 'react-router-dom'
import { containerVariants, cardVariants } from '@/shared/utils/animations'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormInitialValues,
    mode: 'onBlur'
  })

  const onSubmit = (values: LoginFormData) => {
    console.log(values)
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
                  <CardFooter className="flex flex-col items-center justify-center pt-4 pb-0">
                    <Button type="submit" className="w-full">
                      Login
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
