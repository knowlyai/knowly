import { Background } from '@/shared/components/background'
import { BackgroundBlobs } from '@/shared/components/background-blobs'
import { Layout } from '@/shared/components/layout'
import { Card, CardContent } from '@/shared/components/card'
import { Button } from '@/shared/components/button'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { faqFormSchema, FAQFormData } from '../types/faq-form-schema'
import toast from 'react-hot-toast'

export function FAQContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FAQFormData>({
    resolver: zodResolver(faqFormSchema),
    mode: 'onBlur'
  })

  const onSubmit = () => {
    toast.success('Sua mensagem foi enviada com sucesso!', {
      duration: 5000
    })
    reset()
  }

  return (
    <Background className="relative isolate overflow-hidden py-24">
      <BackgroundBlobs />
      <Layout>
        <div className="mx-auto mb-8 w-full max-w-2xl">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <a href="/faq" className="text-primary font-medium hover:underline">
              FAQ
            </a>
            <span className="mx-1">{'>'}</span>
            <span className="text-foreground font-semibold">Fale conosco</span>
          </div>
        </div>
        <motion.h1
          className="text-foreground mb-8 text-center text-4xl font-bold sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Fale conosco
        </motion.h1>
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
          <Card className="bg-card w-full">
            <CardContent className="flex flex-col gap-6 p-8">
              <h2 className="text-foreground mb-2 text-xl font-semibold">
                E-mails de contato
              </h2>
              <ul className="text-muted-foreground flex flex-col gap-2 text-lg">
                <li>
                  <b>Assuntos financeiros:</b>{' '}
                  <a
                    href="mailto:financeiro@knowly.ai"
                    className="text-primary hover:underline"
                  >
                    financeiro@knowly.ai
                  </a>
                </li>
                <li>
                  <b>Suporte geral:</b>{' '}
                  <a
                    href="mailto:suporte@knowly.ai"
                    className="text-primary hover:underline"
                  >
                    suporte@knowly.ai
                  </a>
                </li>
                <li>
                  <b>Parcerias e oportunidades:</b>{' '}
                  <a
                    href="mailto:contato@knowly.ai"
                    className="text-primary hover:underline"
                  >
                    contato@knowly.ai
                  </a>
                </li>
              </ul>
              <span className="text-muted-foreground mt-2 text-sm">
                Se preferir, ou caso não tenha certeza sobre qual e-mail
                utilizar, preencha o formulário abaixo:
              </span>
            </CardContent>
          </Card>
          <Card className="bg-card w-full">
            <CardContent className="p-8">
              <h2 className="text-foreground mb-6 text-center text-2xl font-semibold">
                Formulário de contato
              </h2>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div>
                  <input
                    type="text"
                    placeholder="Nome"
                    className={`w-full rounded-md border px-4 py-2 ${errors.nome ? 'border-red-500' : ''}`}
                    {...register('nome')}
                  />
                  {errors.nome && (
                    <span className="mt-1 block text-xs font-semibold text-red-600">
                      {errors.nome.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="E-mail"
                    className={`w-full rounded-md border px-4 py-2 ${errors.email ? 'border-red-500' : ''}`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="mt-1 block text-xs font-semibold text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Assunto"
                    className={`w-full rounded-md border px-4 py-2 ${errors.assunto ? 'border-red-500' : ''}`}
                    {...register('assunto')}
                  />
                  {errors.assunto && (
                    <span className="mt-1 block text-xs font-semibold text-red-600">
                      {errors.assunto.message}
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    placeholder="Mensagem"
                    className={`min-h-[100px] w-full resize-y rounded-md border px-4 py-2 ${errors.mensagem ? 'border-red-500' : ''}`}
                    {...register('mensagem')}
                  />
                  {errors.mensagem && (
                    <span className="mt-1 block text-xs font-semibold text-red-600">
                      {errors.mensagem.message}
                    </span>
                  )}
                </div>
                <Button type="submit" className="mt-2 w-full">
                  Enviar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </Background>
  )
}
