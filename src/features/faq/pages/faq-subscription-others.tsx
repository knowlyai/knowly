import { Background } from '@/shared/components/background'
import { BackgroundBlobs } from '@/shared/components/background-blobs'
import { Layout } from '@/shared/components/layout'
import { Card, CardContent } from '@/shared/components/card'
import { motion } from 'framer-motion'
import { ArrowRightCircle } from 'lucide-react'

const topics = [
  {
    title: 'Compartilhamento da assinatura',
    link: '/faq/subscription/sharing'
  },
  {
    title: 'Funcionamento da renovação automática',
    link: '/faq/subscription/auto-renewal'
  },
  {
    title: 'Histórico de pagamentos e cobranças',
    link: '/faq/subscription/payment-history'
  },
  {
    title: 'Limites e recursos dos planos',
    link: '/faq/subscription/resources'
  },
  {
    title: 'Gerenciar usuários da assinatura',
    link: '/faq/subscription/users'
  }
]

export function FAQSubscriptionOthersPage() {
  return (
    <Background className="relative isolate overflow-hidden py-24">
      <BackgroundBlobs />
      <Layout>
        <div className="mx-auto mb-8 w-full max-w-3xl">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <a href="/faq" className="text-primary font-medium hover:underline">
              FAQ
            </a>
            <span className="mx-1">{'>'}</span>
            <span className="text-foreground font-semibold">
              Planos e assinaturas
            </span>
          </div>
        </div>
        <motion.h2
          className="text-foreground mb-12 text-center text-3xl font-semibold sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Com qual tema você quer ajuda?
        </motion.h2>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <Card className="bg-card w-full">
            <CardContent className="flex flex-col divide-y divide-gray-200 p-0">
              {topics.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="hover:bg-muted/60 flex items-center justify-between gap-4 px-6 py-5 transition-colors"
                >
                  <div className="text-foreground font-semibold">
                    {item.title}
                  </div>
                  <ArrowRightCircle className="h-5 w-5 text-gray-400" />
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </Background>
  )
}
