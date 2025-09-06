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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { faqFormSchema, FAQFormData } from '../types/faq-form-schema'
import toast from 'react-hot-toast'

export function FAQContactPage() {
  const form = useForm<FAQFormData>({
    resolver: zodResolver(faqFormSchema),
    mode: 'onBlur'
  })

  const onSubmit = () => {
    toast.success('Sua mensagem foi enviada com sucesso!', {
      duration: 5000
    })
    form.reset()
  }

  return (
    <Background className="py-24">
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
        <h1 className="text-foreground mb-8 text-center text-4xl font-bold sm:text-5xl">
          Fale conosco
        </h1>
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
          <Card className="bg-card w-full">
            <CardContent className="flex flex-col gap-6 p-8">
              <h2 className="text-foreground mb-2 text-xl font-semibold">
                E-mails de contato
              </h2>
              <ul className="text-foreground flex flex-col gap-2">
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
                utilizar, preencha o formulário abaixo
              </span>
            </CardContent>
          </Card>
          <Card className="bg-card w-full">
            <CardContent className="p-8">
              <h2 className="text-foreground mb-6 text-center text-2xl font-semibold">
                Formulário de contato
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
                            placeholder="Preciso de ajuda com uma base de conhecimento"
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
        </div>
      </Layout>
    </Background>
  )
}
