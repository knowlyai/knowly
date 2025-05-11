import brain from '@/assets/brain.png'
import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'

function BackgroundBlobs() {
  return (
    <>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.6,
          scale: 1,
          rotate: [0, 360],
          x: [-50, 50, -50],
          y: [0, 100, 0]
        }}
        transition={{
          opacity: { duration: 1.8, ease: 'easeOut' },
          scale: { duration: 1.8, ease: 'easeOut' },
          rotate: { duration: 50, ease: 'linear', repeat: Infinity },
          x: { duration: 50, ease: 'linear', repeat: Infinity },
          y: { duration: 50, ease: 'linear', repeat: Infinity }
        }}
        className="bg-purple-80 fixed top-[-20%] left-[-20%] -z-10 h-[28rem] w-[28rem] rounded-full opacity-60 mix-blend-screen blur-[160px]"
      />

      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.4,
          scale: 1,
          rotate: [0, -360],
          x: [40, -40, 40],
          y: [-60, 60, -60]
        }}
        transition={{
          opacity: { duration: 2, ease: 'easeOut' },
          scale: { duration: 2, ease: 'easeOut' },
          rotate: { duration: 60, ease: 'linear', repeat: Infinity },
          x: { duration: 60, ease: 'linear', repeat: Infinity },
          y: { duration: 60, ease: 'linear', repeat: Infinity }
        }}
        className="fixed top-[25%] right-[-15%] -z-10 h-[36rem] w-[36rem] rounded-full bg-purple-100 opacity-40 mix-blend-screen blur-[180px]"
      />

      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.35,
          scale: 1,
          rotate: [0, 360],
          x: [30, -30, 30],
          y: [80, -80, 80]
        }}
        transition={{
          opacity: { duration: 2.2, ease: 'easeOut' },
          scale: { duration: 2.2, ease: 'easeOut' },
          rotate: { duration: 70, ease: 'linear', repeat: Infinity },
          x: { duration: 70, ease: 'linear', repeat: Infinity },
          y: { duration: 70, ease: 'linear', repeat: Infinity }
        }}
        className="bg-purple-60 fixed bottom-[-20%] left-[10%] -z-10 h-[32rem] w-[32rem] rounded-full opacity-35 mix-blend-screen blur-[200px]"
      />
    </>
  )
}

export function HomePage() {
  return (
    <Background className="relative isolate overflow-hidden">
      <BackgroundBlobs />
      <Layout className="z-10 min-h-screen">
        <motion.section
          className="flex h-screen flex-col items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1
          }}
          transition={{
            opacity: { duration: 2.5, ease: 'easeOut' }
          }}
        >
          <img src={brain} alt="Brain" className="w-1/2" />
          <h1 className="text-6xl font-semibold">Build your own AI</h1>
          <p className="text-center text-4xl font-light">
            Automatically build a knowledge
            <br />
            base to power your own chatbot
          </p>
          <div className="mt-2 flex gap-6">
            <Button>Get Started</Button>
            <a
              href="https://github.com/knowlyai/knowly"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="muted">GitHub</Button>
            </a>
          </div>
        </motion.section>

        <section className="flex h-screen flex-col items-center justify-center">
          <h1 className="mb-12 text-6xl font-semibold">How Knowly Works</h1>
          <div className="flex w-full max-w-6xl justify-between gap-8">
            {/* Parte da Esquerda */}
            <div className="flex flex-col items-center">
              <div className="text-6xl text-purple-500">
                {/* Ícone */}
                <i className="fas fa-brain"></i>
              </div>
              <h1 className="mb-4 text-xl font-semibold">Título 1</h1>
              <p className="text-center text-xl break-words text-gray-600">
                Texto
              </p>
            </div>
            {/* Parte do Meio */}
            <div className="flex flex-col items-center">
              <div className="text-6xl text-purple-500">
                {/* Ícone */}
                <i className="fas fa-cogs"></i>
              </div>
              <h1 className="mb-4 text-xl font-semibold">Título 2</h1>
              <p className="text-center text-xl break-words text-gray-600">
                Texto
              </p>
            </div>

            {/* Parte da Direita */}
            <div className="flex flex-col items-center">
              <div className="text-6xl text-purple-500">
                {/* Ícone */}
                <i className="fas fa-shield-alt"></i>
              </div>
              <h1 className="mb-4 text-xl font-semibold">Título 3</h1>
              <p className="text-center text-xl break-words text-gray-600">
                Texto
              </p>
            </div>
          </div>
        </section>
        <section className="flex h-screen items-center justify-center">
          <h1>Pricing</h1>
          {/* Criar componente card para o princing na feature de home - usa o Button que já existe na shared */}
          {/*
          <Card></Card>
          <Card></Card>
          <Card></Card>
          */}
        </section>
      </Layout>
    </Background>
  )
}
