import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResetPasswordFormData,
  resetPasswordFormSchema
} from '@/features/reset-password/types/reset-password-schema'
import toast from 'react-hot-toast'
import { BackgroundBlobs } from '@/shared/components/background-blobs'
import { cardVariants, containerVariants } from '@/shared/utils/animations'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/form'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/components/card'
import { Input } from '@/shared/components/input'

export function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    mode: 'onBlur'
  })

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data)
    toast.success('Senha redefinida com sucesso!')
    // Adicione aqui a lógica de redefinição de senha
  }

  return (
    <Background className="relative isolate overflow-hidden py-32">
      <BackgroundBlobs />
      <Layout>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={cardVariants}
              className="flex h-full w-full items-center justify-center"
            >
              <Card className="w-11/12 max-w-lg sm:w-2/3 md:w-1/2">
                <CardHeader>
                  <CardTitle>Redefinir senha</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha nova</FormLabel>
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
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar senha nova</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? 'text' : 'password'}
                              className="pr-10"
                              onPaste={(e) => {
                                e.preventDefault()
                                toast.error('Não é permitido colar neste campo')
                              }}
                              onCut={(e) => e.preventDefault()}
                              onCopy={(e) => e.preventDefault()}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {!showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex-col gap-5">
                  <Button type="submit" className="w-full">
                    Confirmar nova senha
                  </Button>
                  <div className="text-foreground/70 text-center text-sm">
                    Lembrou sua senha?{' '}
                    <a
                      href="/login"
                      className="text-primary font-medium hover:underline"
                    >
                      Voltar para login
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.form>
        </Form>
      </Layout>
    </Background>
  )
}
