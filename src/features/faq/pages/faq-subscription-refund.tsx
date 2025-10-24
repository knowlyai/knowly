import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { Card, CardContent } from '@/shared/components/card'
import { Button } from '@/shared/components/button'
import { Input } from '@/shared/components/input'
import { Textarea } from '@/shared/components/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/form'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { faqFormSchema, FAQFormData } from '../types/faq-form-schema'
import toast from 'react-hot-toast'

export function FAQSubscriptionRefundPage() {
  const form = useForm<FAQFormData>({
    resolver: zodResolver(faqFormSchema),
    mode: 'onBlur'
  })

  const onSubmit = () => {
    toast.success('Sua solicitação foi enviada com sucesso!', {
      duration: 5000
    })
    form.reset()
  }

  return (
    <Background className="py-24">
      <Layout>
        <div className="mx-auto mb-8 flex w-full max-w-2xl">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <a href="/faq" className="text-primary font-medium hover:underline">
              FAQ
            </a>
            <span className="mx-1">{'>'}</span>
            <span className="text-foreground font-semibold">Estorno</span>
          </div>
        </div>
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-foreground mb-4 text-center text-4xl font-bold">
            Política de Devolução e Estorno
          </h1>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-center text-lg">
            Nossa política de devolução garante transparência e segurança para
            nossos clientes. Caso precise solicitar o estorno do valor pago,
            verifique as condições abaixo:
          </p>
          <ol className="text-muted-foreground mx-auto mb-8 flex max-w-2xl list-inside list-decimal flex-col gap-3 text-left text-lg">
            <li>
              O pedido de devolução deve ser feito através do formulário abaixo
              em até 7 dias após a confirmação do pagamento.
            </li>
            <li>
              O valor será estornado utilizando o mesmo método de pagamento
              utilizado na compra.
            </li>
            <li>
              O prazo para processamento do estorno pode variar conforme o
              método de pagamento.
            </li>
            <li>
              Em caso de dúvidas, utilize o formulário abaixo para entrar em
              contato com nosso suporte.
            </li>
          </ol>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card mx-auto w-2xl">
            <CardContent className="p-8">
              <h2 className="text-foreground mb-6 text-center text-2xl font-semibold">
                Solicitar estorno ou tirar dúvidas sobre estorno
              </h2>
              <Form {...form}>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="João Silva" {...field} />
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
                          <Input
                            type="email"
                            placeholder="joao.silva@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Preciso de ajuda com estorno do meu cartão"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva sua solicitação"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-2 w-full">
                    Enviar
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.section>
      </Layout>
    </Background>
  )
}
