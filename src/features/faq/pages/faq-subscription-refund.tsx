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

export function FAQSubscriptionRefundPage() {
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
    toast.success('Sua solicitação foi enviada com sucesso!', {
      duration: 5000
    })
    reset()
  }

  return (
    <Background className="relative isolate overflow-hidden py-24">
      <BackgroundBlobs />
      <Layout>
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-foreground mb-4 text-center text-4xl font-bold">
            Política de Devolução e Estorno
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
            Nossa política de devolução garante transparência e segurança para
            nossos clientes. Caso precise solicitar o estorno do valor pago,
            verifique as condições abaixo:
            <br />
            <br />
            - O pedido de devolução deve ser feito através do formulário abaixo
            em até 7 dias após a confirmação do pagamento.
            <br />
            - O valor será estornado utilizando o mesmo método de pagamento
            utilizado na compra.
            <br />
            - O prazo para processamento do estorno pode variar conforme o
            método de pagamento.
            <br />- Em caso de dúvidas, utilize o formulário abaixo para entrar
            em contato com nosso suporte.
          </p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card mx-auto max-w-xl">
            <CardContent className="p-8">
              <h2 className="text-foreground mb-6 text-center text-2xl font-semibold">
                Solicitar estorno
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
                    placeholder="Descreva sua solicitação"
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
        </motion.section>
      </Layout>
    </Background>
  )
}
