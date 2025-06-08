import { useState } from 'react'
import { Layout } from '@/shared/components/layout'
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
    buttonText: 'Get Started'
  },
  {
    title: 'Profissional',
    price: 'R$50',
    features: ['10 Bases de Conhecimento', 'Sandbox', 'Até 5 modelos de IA'],
    buttonText: 'Get Started'
  },
  {
    title: 'Empresarial',
    price: 'R$250',
    features: [
      '50 Bases de Conhecimento',
      'Sandbox',
      'Qualquer modelo de IA disponível'
    ],
    buttonText: 'Get Started'
  }
]

export function SubscriptionManagementPage() {
  const [selected, setSelected] = useState('subscription')
  const [tab, setTab] = useState<'current' | 'history' | 'options'>('current')
  const [billingType, setBillingType] = useState<'monthly' | 'yearly'>(
    'monthly'
  )

  // Simulação de dados do usuário
  const paymentMethod = {
    brand: 'visa',
    last4: '4242',
    expires: '09/2025'
  }
  const plan = plans[1] // Professional

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
      <main className="mt-24 flex flex-1 flex-col items-center justify-center p-8 pl-0">
        <div className="bg-card border-border w-full max-w-5xl rounded-2xl border p-8 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-foreground text-2xl font-semibold">
                Your Subscription
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage your current plan and billing
              </p>
            </div>
            <Button
              variant="ghost"
              className="bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center gap-2"
            >
              <X size={18} /> Cancel Subscription
            </Button>
          </div>
          {/* Tabs */}
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
              Current Plan
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
              Payment History
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
              Plan Options
            </button>
          </div>
          {/* Tab Content */}
          {tab === 'current' && (
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Current Plan */}
              <div className="border-border bg-background flex flex-col gap-2 rounded-xl border p-6 shadow">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xl font-semibold">
                    {plan.title} Plan
                  </span>
                  <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                    Active
                  </span>
                </div>
                <div className="text-muted-foreground mb-2 text-sm">
                  Monthly subscription
                </div>
                <div className="mb-2">
                  <div className="text-muted-foreground mb-1 text-xs">
                    Billing cycle
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: '60%' }}
                      />
                    </div>
                    <span className="text-muted-foreground text-xs">
                      15 days left
                    </span>
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs">
                    Next billing on{' '}
                    <span className="text-foreground font-medium">
                      June 23, 2025
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-foreground text-2xl font-bold">
                    {plan.price}
                    <span className="text-muted-foreground text-base font-normal">
                      {plan.period}
                    </span>
                  </span>
                  <Button variant="secondary" className="ml-2">
                    Change Plan
                  </Button>
                </div>
              </div>
              {/* Payment Method */}
              <div className="border-border bg-background flex flex-col gap-2 rounded-xl border p-6 shadow">
                <div className="mb-2 text-xl font-semibold">Payment Method</div>
                <div className="mb-1 flex items-center gap-2">
                  <CreditCard className="text-primary h-7 w-7" />
                  <span className="text-foreground font-medium">
                    {paymentMethod.brand.toUpperCase()} ending in{' '}
                    {paymentMethod.last4}
                  </span>
                </div>
                <div className="text-muted-foreground mb-2 text-sm">
                  Expires {paymentMethod.expires}
                </div>
                <div className="mt-2 flex gap-2">
                  <Button variant="secondary" size="sm">
                    Update
                  </Button>
                  <Button variant="outline" size="sm">
                    Add New
                  </Button>
                </div>
              </div>
            </div>
          )}
          {tab === 'options' && (
            <div className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                        p/month
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="text-primary/50 flex items-center gap-4 text-left"
                      >
                        <Check className="text-green-60 h-5 w-5" />
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
              <span>No payment history yet.</span>
            </div>
          )}
          {/* Plan Features (always visible in current tab) */}
          {tab === 'current' && (
            <div className="border-border bg-background mt-8 rounded-xl border p-6 shadow">
              <div className="mb-4 text-lg font-semibold">Plan Features</div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-600">✔</span>
                    <span className="text-foreground/90">
                      Unlimited projects
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-600">✔</span>
                    <span className="text-foreground/90">
                      Advanced analytics
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-600">✔</span>
                    <span className="text-foreground/90">
                      Team collaboration
                    </span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-600">✔</span>
                    <span className="text-foreground/90">
                      Up to 10 team members
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-600">✔</span>
                    <span className="text-foreground/90">Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}

export default SubscriptionManagementPage
