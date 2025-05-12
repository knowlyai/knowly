import brain from '@/assets/brain.png'
import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import berti from '@/assets/berti.jfif'
import izabel from '@/assets/izabel.jfif'
import rubio from '@/assets/rubio.jfif'
import julia from '@/assets/julia.jfif'
import sakamoto from '@/assets/Sakamoto.jfif'

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
        <section className="flex h-screen items-center justify-center">
          <h1>How Knowly works</h1>
          <div></div>
          <div></div>
          <div></div>
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
        <section
          id="#about-us"
          className="flex h-screen flex-col items-center justify-center"
        >
          <h1 className="mb-8 text-6xl font-semibold">About Us</h1>
          <div className="mb-8 text-center md:text-center">
            <p className="text-lg">
              Knowly was created by a group of five Computer Engineering
              students during their final year of university at Instituto Mauá
              de Tecnologia.
            </p>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-5 grid-rows-1 items-center justify-items-center gap-4">
            <img
              src={sakamoto}
              alt="Enzo Sakamoto"
              className="col-start-1 row-start-1 h-24 w-24 rounded-full object-cover shadow-lg"
            />
            <span className="mt-2 text-center text-sm font-medium">
              Enzo Sakamoto
            </span>
            <img
              src={izabel}
              alt="Izabel Sampaio Goes"
              className="col-start-2 row-start-1 h-24 w-24 rounded-full object-cover shadow-lg"
            />
            <span className="mt-2 text-center text-sm font-medium">
              Izabel Sampaio Goes
            </span>
            <img
              src={rubio}
              alt="Rafael Rúbio Carnes"
              className="col-start-3 row-start-1 h-24 w-24 rounded-full object-cover shadow-lg"
            />
            <span className="mt-2 text-center text-sm font-medium">
              Rafael Rúbio Carnes
            </span>
            <img
              src={julia}
              alt="Júlia Galhardi Cerqueira"
              className="col-start-4 row-start-1 h-24 w-24 rounded-full object-cover shadow-lg"
            />
            <span className="mt-2 text-center text-sm font-medium">
              Júlia Galhardi Cerqueira
            </span>
            <img
              src={berti}
              alt="Vinícius Berti"
              className="col-start-5 row-start-1 h-24 w-24 rounded-full object-cover shadow-lg"
            />
            <span className="mt-2 text-center text-sm font-medium">
              Vinícius Berti
            </span>
          </div>
        </section>
      </Layout>
    </Background>
  )
}
