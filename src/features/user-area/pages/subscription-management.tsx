import { useState } from 'react'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Sidebar, SidebarItem } from '@/shared/components/sidebar'
import { Button } from '@/shared/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/components/card'
import {
  CreditCard,
  User,
  BrainCircuit,
  BadgeDollarSign,
  X,
  Check
} from 'lucide-react'
import clsx from 'clsx'

const sidebarItems: SidebarItem[] = [
  { label: 'Dados de cadastro', icon: <User />, key: 'dados' },
  { label: 'Minhas bases', icon: <BrainCircuit />, key: 'bases' },
  { label: 'Assinatura', icon: <BadgeDollarSign />, key: 'subscription' }
]

const plans = [
  {
    title: 'Pessoal',
    price: 'R$25',
    features: ['2 Bases de Conhecimento', 'Sandbox', '1 modelo de IA'],
    buttonText: 'Assinar'
  },
  {
    title: 'Profissional',
    price: 'R$50',
    features: ['10 Bases de Conhecimento', 'Sandbox', 'Até 5 modelos de IA'],
    buttonText: 'Assinar'
  },
  {
    title: 'Empresarial',
    price: 'R$250',
    features: [
      '50 Bases de Conhecimento',
      'Sandbox',
      'Qualquer modelo de IA disponível'
    ],
    buttonText: 'Assinar'
  }
]

export function SubscriptionManagementPage() {
  const [selected, setSelected] = useState('subscription')
  const [tab, setTab] = useState<'current' | 'history' | 'options'>('current')

  // Simulação de dados do usuário
  const paymentMethod = {
    brand: 'visa',
    last4: '4242',
    expires: '09/2025'
  }
  const plan = plans[1] // Profissional

  return (
    <Layout className="bg-background min-h-screen min-w-screen">
      <Sidebar
        items={sidebarItems}
        selected={selected}
        setSelected={setSelected}
        onLogout={() => {
          /* logout logic */
        }}
      />
      <main className="mt-24 flex flex-1 flex-col items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          <section>
            <h1 className="text-foreground mb-6 text-center text-4xl font-semibold drop-shadow-xl sm:text-6xl">
              Assinatura
            </h1>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-muted-foreground text-sm">
                  Administre o pagamento do seu plano atual
                </span>
              </div>
              <Button
                variant="ghost"
                className="bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center gap-2"
              >
                <X size={18} /> Cancelar assinatura
              </Button>
            </div>
            <div className="mb-6 flex gap-2">
              <button
                className={clsx(
                  'rounded-t-lg px-6 py-2 font-medium transition-colors',
                  tab === 'current'
                    ? 'bg-primary/90 text-primary-foreground'
                    : 'bg-muted text-foreground/70 hover:bg-muted/70'
                )}
                onClick={() => setTab('current')}
              >
                Plano atual
              </button>
              <button
                className={clsx(
                  'rounded-t-lg px-6 py-2 font-medium transition-colors',
                  tab === 'history'
                    ? 'bg-primary/90 text-primary-foreground'
                    : 'bg-muted text-foreground/70 hover:bg-muted/70'
                )}
                onClick={() => setTab('history')}
              >
                Histórico de pagamento
              </button>
              <button
                className={clsx(
                  'rounded-t-lg px-6 py-2 font-medium transition-colors',
                  tab === 'options'
                    ? 'bg-primary/90 text-primary-foreground'
                    : 'bg-muted text-foreground/70 hover:bg-muted/70'
                )}
                onClick={() => setTab('options')}
              >
                Planos disponíveis
              </button>
            </div>
            {tab === 'current' && (
              <div className="mb-8 space-y-6">
                <div className="border-border bg-background flex flex-col gap-2 rounded-xl border p-6 shadow">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-foreground text-xl font-semibold">
                      Plano {plan.title}
                    </span>
                    <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                      Ativo
                    </span>
                  </div>
                  <div className="text-muted-foreground mb-2 text-sm">
                    Assinatura mensal
                  </div>
                  <div className="mb-2">
                    <div className="text-muted-foreground mb-1 text-xs">
                      Ciclo de cobrança
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: '60%' }}
                        />
                      </div>
                      <span className="text-muted-foreground text-xs">
                        15 dias restantes
                      </span>
                    </div>
                    <div className="text-muted-foreground mt-1 text-xs">
                      Próximo pagamento em{' '}
                      <span className="text-foreground font-medium">
                        23 de Junho de 2025
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <span className="text-foreground text-2xl font-bold">
                      {plan.price}
                      <span className="text-muted-foreground text-base font-normal">
                        /mês
                      </span>
                    </span>
                    <Button variant="secondary" className="ml-2">
                      Mudar plano
                    </Button>
                  </div>
                </div>
                <div className="border-border bg-background flex flex-col gap-2 rounded-xl border p-6 shadow">
                  <div className="text-foreground mb-2 text-xl font-semibold">
                    Método de pagamento
                  </div>
                  <div className="mb-1 flex items-center gap-2">
                    <CreditCard className="text-primary h-7 w-7" />
                    <span className="text-foreground font-medium">
                      {paymentMethod.brand.toUpperCase()} terminado em{' '}
                      {paymentMethod.last4}
                    </span>
                  </div>
                  <div className="text-muted-foreground mb-2 text-sm">
                    Expira {paymentMethod.expires}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button variant="secondary" size="sm">
                      Alterar
                    </Button>
                    <Button variant="secondary" size="sm">
                      Adicionar novo
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {tab === 'options' && (
              <div className="grid w-full gap-8 md:grid-cols-2">
                {plans.map((plan, idx) => (
                  <Card
                    key={idx}
                    className="from-background to-background/80 w-full bg-gradient-to-b text-center"
                  >
                    <CardHeader>
                      <CardDescription>{plan.title}</CardDescription>
                      <CardTitle className="text-4xl font-extrabold">
                        {plan.price}{' '}
                        <span className="text-muted-foreground text-base font-normal">
                          /mês
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="text-primary/50 flex items-center gap-4 text-left"
                        >
                          <Check className="h-5 w-5 text-green-600" />
                          {feature}
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">{plan.buttonText}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            {tab === 'history' && (
              <div className="text-muted-foreground py-12 text-center">
                <span>Nenhum histórico de pagamento ainda.</span>
              </div>
            )}
          </section>
        </motion.div>
      </main>
    </Layout>
  )
}

export default SubscriptionManagementPage
