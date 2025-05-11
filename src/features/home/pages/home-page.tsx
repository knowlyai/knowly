import brain from '@/assets/brain.png'
import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

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
          <h1 className="mb-10 text-6xl font-semibold">How Knowly Works</h1>
          <div className="flex w-full max-w-6xl justify-between gap-8">
            {/* Parte da Esquerda */}
            <div className="flex flex-col items-center">
              <div className="h-100 w-100">
                <DotLottieReact
                  src="https://lottie.host/ade48407-0fab-452b-8257-6bde53c7dc0c/QXs4qptUZD.lottie"
                  loop
                  autoplay
                />
              </div>
              <h1 className="mb-4 text-3xl font-semibold">You Upload</h1>
              <p className="text-center text-xl break-words text-white/50">
                Upload the PDF files you wish to make up the knowledge base
              </p>
            </div>
            {/* Parte do Meio */}
            <div className="flex flex-col items-center">
              <div className="h-100 w-100">
                <DotLottieReact
                  src="https://lottie.host/e10d7ded-6bde-4049-afd0-1d902c61d1d2/oSwowUt9Qm.lottie"
                  loop
                  autoplay
                  segment={[70, 278]}
                />
              </div>
              <h1 className="mb-4 text-3xl font-semibold">We Build</h1>
              <p className="text-center text-xl break-words text-white/50">
                We use the files to train a Gen AI model
              </p>
            </div>

            {/* Parte da Direita */}
            <div className="flex flex-col items-center">
              <div className="h-100 w-100">
                <DotLottieReact
                  src="https://lottie.host/e84fe9c7-0ada-4dcb-a6c0-3e5ae46e1354/GgsWdQCrtV.lottie"
                  loop
                  autoplay
                />
              </div>
              <h1 className="mb-4 text-3xl font-semibold">You Enjoy</h1>
              <p className="text-center text-xl break-words text-white/50">
                After the model is done, you can try it and use it as you wish
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
