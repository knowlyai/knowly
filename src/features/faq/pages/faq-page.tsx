import { Background } from '@/shared/components/background'
import { BackgroundBlobs } from '@/shared/components/background-blobs'
import { Layout } from '@/shared/components/layout'
import { Card, CardContent } from '@/shared/components/card'
import { motion } from 'framer-motion'
import {
  ArrowRightCircle,
  ShoppingBag,
  RefreshCw,
  HelpCircle,
  BrainCircuit,
  FileCog,
  User,
  Handshake
} from 'lucide-react'

const faqSections = [
  {
    title: 'Planos e Assinaturas',
    items: [
      {
        icon: <ShoppingBag className="h-6 w-6" />,
        title: 'Administrar e cancelar planos de assinatura',
        description:
          'Pagar, gerenciar o uso, alterar ou cancelar planos de assinatura.',
        link: '/subscription-management'
      },
      {
        icon: <RefreshCw className="h-6 w-6" />,
        title: 'Devoluções e reembolsos',
        description: 'Devolver valor pago ou consultar condições de estorno.',
        link: '/faq/subscription/refund'
      },
      {
        icon: <HelpCircle className="h-6 w-6" />,
        title: 'Perguntas frequentes sobre planos e assinaturas',
        description: 'Outras dúvidas sobre planos e assinaturas.',
        link: '/faq/subscription/others'
      }
    ]
  },
  {
    title: 'Bases de Conhecimento',
    items: [
      {
        icon: <BrainCircuit className="h-6 w-6" />,
        title: 'Criação de novas bases',
        description:
          'Quais as formas e como é o processo de criação de bases de conhecimento.',
        link: '/faq/bases/create'
      },
      {
        icon: <FileCog className="h-6 w-6" />,
        title: 'Gerenciar documentos',
        description:
          'Consultar, visualizar, adicionar ou excluir os documentos das minhas bases.',
        link: '/faq/bases/documents'
      },
      {
        icon: <HelpCircle className="h-6 w-6" />,
        title: 'Perguntas frequentes sobre bases de conhecimento',
        description: 'Outras dúvidas sobre bases de conhecimento.',
        link: '/faq/bases/others'
      }
    ]
  },
  {
    title: 'Ajuda com sua conta',
    items: [
      {
        icon: <User className="h-6 w-6" />,
        title: 'Perfil',
        description: '',
        link: '/faq/account/profile'
      },
      {
        icon: <HelpCircle className="h-6 w-6" />,
        title: 'Segurança e acesso à conta',
        description: '',
        link: '/faq/account/access'
      }
    ]
  },
  {
    title: 'Precisa de mais ajuda?',
    items: [
      {
        icon: <Handshake className="h-6 w-6" />,
        title: 'Fale conosco',
        description: 'Formas de entrar em contato com o suporte.',
        link: '/faq/contact'
      }
    ]
  }
]

export function FAQPage() {
  return (
    <Background className="relative isolate overflow-hidden py-24">
      <BackgroundBlobs />
      <Layout>
        <motion.h1
          className="text-foreground mb-12 text-center text-6xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          FAQ
        </motion.h1>
        <div className="flex flex-col gap-16">
          {faqSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-foreground mb-6 text-2xl font-semibold">
                {section.title}
              </h2>
              <Card className="bg-card w-full">
                <CardContent className="flex flex-col divide-y divide-gray-200 p-0">
                  {section.items.map((item) => (
                    <a
                      key={item.title}
                      href={item.link}
                      className="hover:bg-muted/60 flex items-center justify-between gap-4 px-6 py-5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {item.icon}
                        <div>
                          <div className="text-foreground font-semibold">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-muted-foreground text-sm">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRightCircle className="h-5 w-5 text-gray-400" />
                    </a>
                  ))}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </Layout>
    </Background>
  )
}
