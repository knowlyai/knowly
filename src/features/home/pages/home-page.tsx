import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { Accordion, AccordionItem } from '@/shared/components/accordion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import berti from '@/assets/berti.jfif'
import izabel from '@/assets/izabel.jfif'
import rubio from '@/assets/rubio.jfif'
import julia from '@/assets/julia.jfif'
import sakamoto from '@/assets/sakamoto.jfif'
import { Fragment } from 'react/jsx-runtime'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/components/card'
import { ArrowDown, ArrowRight, Check } from 'lucide-react'
import { BackgroundBlobs } from '@/shared/components/background-blobs'
import { Footer } from '@/features/home/components/footer'

const plans = [
  {
    title: 'Pessoal',
    price: 'R$ 25',
    features: [
      '2 Bases de conhecimento',
      'Ambiente de testes',
      'Um modelo de IA'
    ],
    buttonText: 'Começar'
  },
  {
    title: 'Profissional',
    price: 'R$ 50',
    features: [
      '10 Bases de conhecimento',
      'Ambiente de testes',
      'Até 5 modelos de IA'
    ],
    buttonText: 'Começar'
  },
  {
    title: 'Empresarial',
    price: 'R$ 250',
    features: [
      '50 Bases de conhecimento',
      'Ambiente de testes',
      'Qualquer modelo de IA disponível'
    ],
    buttonText: 'Começar'
  }
]

const faqs = [
  {
    title: 'Que tipo de arquivo posso fazer upload?',
    content:
      'Atualmente, você pode fazer upload de arquivos PDF. Estamos trabalhando para adicionar suporte a outros tipos de arquivo no futuro.'
  },
  {
    title: 'Posso criar mais de um modelo?',
    content:
      'Sim, você pode criar múltiplos modelos com diferentes bases de conhecimento.'
  },
  {
    title: 'Preciso saber programar?',
    content:
      'Não, você só precisa fazer upload dos arquivos e nós cuidamos do resto.'
  }
]

const process = [
  {
    title: 'Você envia',
    content:
      'Faça upload dos arquivos PDF que deseja incluir na base de conhecimento',
    image: (
      <DotLottieReact
        src="https://lottie.host/ade48407-0fab-452b-8257-6bde53c7dc0c/QXs4qptUZD.lottie"
        loop
        autoplay
        className="objet-cover"
      />
    )
  },
  {
    title: 'Nós construímos',
    content:
      'Usamos os arquivos para construir bases de conhecimento que ampliam o conhecimento da inteligência artificial sobre determinado assunto',
    image: (
      <DotLottieReact
        src="https://lottie.host/e10d7ded-6bde-4049-afd0-1d902c61d1d2/oSwowUt9Qm.lottie"
        loop
        autoplay
      />
    )
  },
  {
    title: 'Você desfruta',
    content:
      'Após o modelo estar pronto, você pode testá-lo e usá-lo como desejar',
    image: (
      <DotLottieReact
        src="https://lottie.host/e84fe9c7-0ada-4dcb-a6c0-3e5ae46e1354/GgsWdQCrtV.lottie"
        loop
        autoplay
      />
    )
  }
]

const owners = [
  {
    name: 'Enzo Sakamoto',
    image: sakamoto,
    role: 'Estagiário de Arquitetura de Software na XP Inc.',
    linkedin: 'https://www.linkedin.com/in/enzosakamoto/'
  },
  {
    name: 'Izabel Sampaio Goes',
    image: izabel,
    role: 'Estagiária de Ciência de Dados e IA na Evo Systems',
    linkedin: 'https://www.linkedin.com/in/izabel-sampaio-goes/'
  },
  {
    name: 'Rafael Rubio',
    image: rubio,
    role: 'Estagiário de Desenvolvimento de Software na Socium',
    linkedin: 'https://www.linkedin.com/in/rafael-rubio-carnes-b2561b212/'
  },
  {
    name: 'Júlia Galhardi Cerqueira',
    image: julia,
    role: 'Estagiária'
  },
  {
    name: 'Vinícius Berti',
    image: berti,
    role: 'Estagiário de Dados para Antifraude na Capim',
    linkedin: 'https://www.linkedin.com/in/vinicius-berti-a80354209/'
  }
]

function LogoCarousel() {
  const logos = [
    'https://store-images.s-microsoft.com/image/apps.22898.1ee6619e-8cd6-4c91-a459-3abe6a6cf7b3.84da202a-9b47-4a76-be2c-79f143c64050.21add500-ed5b-42ee-b87d-ee415ae071fc',
    'https://play-lh.googleusercontent.com/d2zqBFBEymSZKaVg_dRo1gh3hBFn7_Kl9rO74xkDmnJeLgDW0MoJD3cUx0QzZN6jdsg=w240-h480-rw',
    'https://t2.tudocdn.net/716766?w=824&h=494',
    'https://static.vecteezy.com/system/resources/previews/019/136/322/non_2x/amazon-logo-amazon-icon-free-free-vector.jpg',
    'https://azure.microsoft.com/en-us/blog/wp-content/uploads/2024/02/MSFT_Azure_FEB12_319938_Blog_BlogHeader_240226_600x600_V1.jpg'
  ]
  const allLogos = [...logos, ...logos, ...logos, ...logos]
  return (
    <motion.div
      className="relative w-full overflow-hidden py-8 sm:w-1/3"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
      }}
      transition={transition}
      variants={variants}
    >
      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', window.innerWidth >= 768 ? '-50%' : '-300%'] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'linear'
        }}
      >
        {allLogos.map((logo, idx) => (
          <div key={idx} className="h-26 w-26 flex-shrink-0">
            <img
              src={logo}
              alt="Logo de modelo Bedrock"
              draggable={false}
              className="h-26 w-26 rounded-md bg-white object-cover shadow-lg select-none"
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
const variants = {
  hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
  visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 }
}

const title = 'Pense além com Knowly'
const words = title.split(' ')

export function HomePage() {
  return (
    <Background className="relative isolate overflow-hidden">
      <BackgroundBlobs />
      <Layout className="space-y-32 md:space-y-0">
        <motion.section
          id="home"
          className="flex h-screen max-w-4/5 flex-col items-center justify-center gap-6 sm:max-w-none"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.04 }}
        >
          <h1 className="text-center text-4xl font-semibold tracking-tight drop-shadow-xl sm:text-5xl md:text-7xl">
            {words.map((word, index) => (
              <Fragment key={index}>
                <motion.span
                  className={`inline-block ${word === 'Knowly' ? 'from-primary to-foreground bg-gradient-to-r bg-clip-text text-transparent' : ''}`}
                  transition={transition}
                  variants={variants}
                >
                  {word}
                </motion.span>
                {index < words.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>
          <motion.p
            className="text-foreground/70 max-w-3xl text-center text-base font-light sm:text-lg md:text-2xl"
            transition={transition}
            variants={variants}
          >
            Uma plataforma de produtividade que transforma seus documentos em
            uma base de conhecimento de IA personalizada e poderosa. Mantenha-se
            organizado, eficiente e capacitado.
          </motion.p>

          <motion.div
            className="mt-2 flex gap-6"
            transition={transition}
            variants={variants}
          >
            <Button>Começar</Button>
            <a
              href="https://github.com/knowlyai/knowly"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline">GitHub</Button>
            </a>
          </motion.div>
          <LogoCarousel />
        </motion.section>
        <motion.section
          id="how-knowly-works"
          className="flex h-auto flex-col items-center justify-center gap-18"
          style={{ paddingTop: '15vh', paddingBottom: '15vh' }}
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.04 }}
        >
          <motion.h1
            className="text-center text-4xl font-semibold sm:text-6xl"
            transition={transition}
            variants={variants}
          >
            Como o Knowly Funciona
          </motion.h1>
          <motion.div
            className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
            transition={transition}
            variants={variants}
          >
            {process.map((content, idx) => (
              <Card
                key={idx}
                className="bg-background relative flex flex-col items-center"
              >
                <CardHeader>
                  <CardTitle className="text-foreground mb-4 text-3xl font-semibold">
                    {content.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 sm:h-64 md:size-fit">
                    {content.image}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-foreground/80 text-center text-xl break-words">
                    {content.content}
                  </p>
                </CardFooter>
                {idx < process.length - 1 && window.innerWidth >= 768 && (
                  <ArrowRight className="bg-background animate-bounce-right absolute inset-0 top-1/2 left-full ml-[6px] h-8 w-8 rounded-full p-2" />
                )}
                {idx < process.length - 1 && window.innerWidth < 768 && (
                  <ArrowDown className="bg-background absolute inset-0 top-full left-1/2 mt-[10px] h-8 w-8 -translate-x-1/2 transform animate-bounce rounded-full p-2" />
                )}
              </Card>
            ))}
          </motion.div>
        </motion.section>
        <motion.section
          id="pricing"
          className="flex h-auto w-full flex-col items-center justify-center"
          style={{ paddingTop: '15vh', paddingBottom: '15vh' }}
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.04 }}
        >
          <motion.h1
            className="mb-12 text-6xl font-semibold"
            transition={transition}
            variants={variants}
          >
            Preços
          </motion.h1>
          <motion.div
            className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            transition={transition}
            variants={variants}
          >
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
                      p/mês
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
          </motion.div>
        </motion.section>
        <motion.section
          id="faq"
          className="flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
          style={{ paddingTop: '15vh', paddingBottom: '15vh' }}
          initial="hidden"
          whileInView="visible"
          transition={{
            staggerChildren: 0.04,
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          variants={variants}
        >
          <motion.h1
            className="mb-8 text-center text-5xl font-semibold sm:mb-12 md:text-6xl"
            transition={transition}
            variants={variants}
          >
            FAQ
          </motion.h1>
          <motion.div
            className="w-full max-w-4xl"
            transition={transition}
            variants={variants}
          >
            <Accordion className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} title={faq.title}>
                  {faq.content}
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.section>
        <motion.section
          id="about-us"
          className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
          style={{ paddingTop: '10vh', paddingBottom: '10vh' }}
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.04 }}
        >
          <motion.h1
            className="mb-6 text-center text-4xl font-semibold sm:mb-8 sm:text-5xl md:text-6xl"
            transition={transition}
            variants={variants}
          >
            Sobre nós
          </motion.h1>
          <motion.div
            className="mb-8 max-w-4xl text-justify text-base leading-relaxed sm:text-lg md:mb-12 md:text-xl"
            transition={transition}
            variants={variants}
          >
            O Knowly foi criado por um grupo de cinco estudantes de Engenharia
            da Computação durante o último ano de graduação no Instituto Mauá de
            Tecnologia no Trabalho de Conclusão de Curso (TCC).
          </motion.div>
          <motion.div
            className="grid w-full max-w-7xl grid-cols-1 items-center justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8"
            transition={transition}
            variants={variants}
          >
            {owners.map((owner, index) => (
              <a
                key={index}
                href={owner.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-full w-full items-center justify-center"
              >
                <Card className="flex h-[180px] w-full max-w-[280px] flex-col items-center justify-center p-4 transition-transform hover:scale-105 sm:h-[200px] md:max-w-none lg:h-[220px]">
                  <img
                    src={owner.image}
                    alt={owner.name}
                    className="h-16 w-16 rounded-full object-cover shadow-lg sm:h-20 sm:w-20 md:h-24 md:w-24"
                  />
                  <span className="mt-3 text-center text-xs leading-tight font-medium sm:text-sm md:mt-4">
                    {owner.name}
                  </span>
                  <span className="text-muted-foreground mt-2 text-center text-xs leading-tight font-light sm:text-sm">
                    {owner.role}
                  </span>
                </Card>
              </a>
            ))}
          </motion.div>
        </motion.section>
        <Footer />
      </Layout>
    </Background>
  )
}
