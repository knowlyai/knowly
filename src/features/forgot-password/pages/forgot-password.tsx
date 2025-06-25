import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  forgotPasswordFormSchema,
  ForgotPasswordFormData
} from '../types/forgot-password-schema'
import toast from 'react-hot-toast'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/shared/components/form'
import { Input } from '@/shared/components/input'
import { cardVariants, containerVariants } from '@/shared/utils/animations'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/components/card'
import { BackgroundBlobs } from '@/shared/components/background-blobs'

export function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: ''
    },
    mode: 'onBlur'
  })

  const onSubmit = (values: ForgotPasswordFormData) => {
    console.log(values)
    toast.success(
      'Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.',
      {
        duration: 5000
      }
    )
    form.resetField('email')
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
                  <CardTitle className="text-center">
                    Esqueci minha senha
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Digite seu e-mail" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-foreground/70 text-center text-sm">
                    Lembrou sua senha?{' '}
                    <a
                      href="/login"
                      className="text-primary font-medium hover:underline"
                    >
                      Voltar para login
                    </a>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Enviar instruções
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.form>
        </Form>
      </Layout>
    </Background>
  )
}
