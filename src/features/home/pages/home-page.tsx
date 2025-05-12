import brain from '@/assets/brain.png'
import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { Accordion, AccordionItem } from '@/shared/components/accordion'

const faqs = [
  {
    title: 'What kind of file can I upload?',
    content:
      'Currently, you can upload PDF files. We are working on adding support for other file types in the future.'
  },
  {
    title: 'Can I create more than one model?',
    content:
      'Yes, you can create multiple models with different knowledge bases.'
  },
  {
    title: 'Do I need to code?',
    content:
      'No, you only need to upload the files and we take care of the rest.'
  }
]

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
          id="faq"
          className="flex h-screen flex-col items-center justify-center"
        >
          <h1 className="mb-12 text-6xl font-semibold">FAQ</h1>
          <Accordion className="w-250">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} title={faq.title}>
                {faq.content}
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </Layout>
    </Background>
  )
}
