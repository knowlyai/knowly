import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { Accordion, AccordionItem } from '@/shared/components/accordion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
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
import { Link } from 'react-router-dom'

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
    image: 'https://d1b8zs4rmj3xdl.cloudfront.net/sakamoto.jpeg',
    role: 'Arquiteto de Software Júnior na XP Inc.',
    linkedin: 'https://www.linkedin.com/in/enzosakamoto/'
  },
  {
    name: 'Izabel Sampaio Goes',
    image: 'https://d1b8zs4rmj3xdl.cloudfront.net/iza.jpeg',
    role: 'Estagiária de Business Analytics na Amazon',
    linkedin: 'https://www.linkedin.com/in/izabel-sampaio-goes/'
  },
  {
    name: 'Rafael Rubio',
    image: 'https://d1b8zs4rmj3xdl.cloudfront.net/rubio.png',
    role: 'Estagiário de Desenvolvimento de Software na Socium',
    linkedin: 'https://www.linkedin.com/in/rafael-rubio-carnes-b2561b212/'
  },
  {
    name: 'Júlia Galhardi Cerqueira',
    image: 'https://d1b8zs4rmj3xdl.cloudfront.net/julia.jpeg',
    role: 'Estagiária de Implementação e Suporte na Bastos Tecnologia',
    linkedin: 'https://www.linkedin.com/in/j%C3%BAliacerqueira/'
  },
  {
    name: 'Vinícius Berti',
    image: 'https://d1b8zs4rmj3xdl.cloudfront.net/berti.jpeg',
    role: 'Estagiário de Dados para Antifraude na Capim',
    linkedin: 'https://www.linkedin.com/in/vinicius-berti-a80354209/'
  }
]

function LogoCarousel() {
  const logos = [
    {
      url: 'https://store-images.s-microsoft.com/image/apps.22898.1ee6619e-8cd6-4c91-a459-3abe6a6cf7b3.84da202a-9b47-4a76-be2c-79f143c64050.21add500-ed5b-42ee-b87d-ee415ae071fc',
      comingSoon: true
    }, // Meta
    {
      url: 'https://play-lh.googleusercontent.com/d2zqBFBEymSZKaVg_dRo1gh3hBFn7_Kl9rO74xkDmnJeLgDW0MoJD3cUx0QzZN6jdsg=w240-h480-rw',
      comingSoon: true
    }, // Deep Seek
    {
      url: 'https://static.vecteezy.com/system/resources/previews/019/136/322/non_2x/amazon-logo-amazon-icon-free-free-vector.jpg',
      comingSoon: false
    }, // Amazon
    {
      url: 'https://t2.tudocdn.net/716766?w=824&h=494',
      comingSoon: true
    }, // Claude Sonnet
    {
      url: 'https://azure.microsoft.com/en-us/blog/wp-content/uploads/2024/02/MSFT_Azure_FEB12_319938_Blog_BlogHeader_240226_600x600_V1.jpg',
      comingSoon: false
    } // Mistral
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
          <div key={idx} className="relative h-26 w-26 flex-shrink-0">
            <img
              src={logo.url}
              alt="Logo de modelo Bedrock"
              draggable={false}
              className="h-26 w-26 rounded-md bg-white object-cover shadow-lg select-none"
            />
            {logo.comingSoon && (
              <span className="bg-primary/90 absolute right-1 bottom-1 rounded-xl px-2 py-1 text-[9px] font-medium text-white">
                Em breve
              </span>
            )}
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
          className="flex h-screen max-w-4/5 flex-col items-center justify-center gap-8 pt-32 sm:max-w-none sm:pt-0"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.04 }}
        >
          <h1 className="text-center text-4xl font-bold tracking-tight drop-shadow-xl sm:text-6xl md:text-8xl lg:leading-tight">
            {words.map((word, index) => (
              <Fragment key={index}>
                <motion.span
                  className={`inline-block ${word === 'Knowly' ? 'from-primary bg-gradient-to-r via-purple-500 to-pink-500 bg-clip-text text-transparent' : ''}`}
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
            className="text-foreground/70 max-w-3xl text-center text-base leading-relaxed font-light sm:text-xl md:text-2xl"
            transition={transition}
            variants={variants}
          >
            Uma plataforma de produtividade que transforma seus documentos em
            uma base de conhecimento de IA personalizada e poderosa. Mantenha-se
            organizado, eficiente e capacitado.
          </motion.p>

          <motion.div
            className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
            transition={transition}
            variants={variants}
          >
            <Link to="/docs">
              <Button className="px-8 py-6 text-lg font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link
              to="https://github.com/knowlyai/knowly"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="hover:bg-primary/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all hover:scale-105"
              >
                Ver no GitHub
              </Button>
            </Link>
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
          <motion.div
            className="mb-8 space-y-4 text-center"
            transition={transition}
            variants={variants}
          >
            <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
              Como o Knowly Funciona
            </h1>
            <p className="text-foreground/60 mx-auto max-w-2xl text-lg">
              Três passos simples para transformar seus documentos em IA
            </p>
          </motion.div>
          <motion.div
            className="grid w-full grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3"
            transition={transition}
            variants={variants}
          >
            {process.map((content, idx) => (
              <Card
                key={idx}
                className="from-background to-background/50 hover:border-primary/50 relative flex flex-col items-center border-2 bg-gradient-to-br backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <CardHeader>
                  <div className="bg-primary/20 text-primary absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
                    {idx + 1}
                  </div>
                  <CardTitle className="text-foreground mb-4 pt-8 text-3xl font-bold">
                    {content.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 sm:h-64 md:size-fit">
                    {content.image}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-foreground/80 text-center text-xl leading-relaxed break-words">
                    {content.content}
                  </p>
                </CardFooter>
                {idx < process.length - 1 && window.innerWidth >= 768 && (
                  <ArrowRight className="bg-primary/20 text-primary animate-bounce-right absolute inset-0 top-1/2 left-full ml-[6px] h-10 w-10 rounded-full p-2 shadow-lg backdrop-blur-sm" />
                )}
                {idx < process.length - 1 && window.innerWidth < 768 && (
                  <ArrowDown className="bg-primary/20 text-primary absolute inset-0 top-full left-1/2 mt-[10px] h-10 w-10 -translate-x-1/2 transform animate-bounce rounded-full p-2 shadow-lg backdrop-blur-sm" />
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
          <motion.div
            className="mb-16 space-y-4 text-center"
            transition={transition}
            variants={variants}
          >
            <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
              Preços Simples e Transparentes
            </h1>
            <p className="text-foreground/60 mx-auto max-w-2xl text-lg">
              Escolha o plano perfeito para suas necessidades
            </p>
          </motion.div>
          <motion.div
            className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            transition={transition}
            variants={variants}
          >
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`from-background to-background/80 w-full bg-gradient-to-b text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  idx === 1
                    ? 'border-primary shadow-primary/20 border-2 shadow-xl lg:scale-105'
                    : 'border-2'
                }`}
              >
                {idx === 1 && (
                  <div className="from-primary absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r to-purple-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    Mais Popular
                  </div>
                )}
                <CardHeader className="pt-8">
                  <CardDescription className="text-lg font-semibold">
                    {plan.title}
                  </CardDescription>
                  <CardTitle className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent">
                    {plan.price}
                  </CardTitle>
                  <span className="text-muted-foreground text-base font-normal">
                    p/mês
                  </span>
                </CardHeader>
                <CardContent className="space-y-4 py-6">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="text-foreground/70 flex items-center gap-4 text-left"
                    >
                      <div className="rounded-full bg-green-500/20 p-1">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pb-8">
                  <Button
                    className={`w-full py-6 text-lg font-semibold ${idx === 1 ? 'shadow-primary/30 shadow-lg' : ''}`}
                  >
                    {plan.buttonText}
                  </Button>
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
          <motion.div
            className="mb-12 space-y-4 text-center"
            transition={transition}
            variants={variants}
          >
            <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
              Perguntas Frequentes
            </h1>
            <p className="text-foreground/60 mx-auto max-w-2xl text-lg">
              Tudo o que você precisa saber sobre o Knowly
            </p>
          </motion.div>
          <motion.div
            className="w-full max-w-4xl"
            transition={transition}
            variants={variants}
          >
            <Accordion className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} title={faq.title}>
                  {faq.content}
                </AccordionItem>
              ))}
              <AccordionItem title="Outra dúvida?">
                <div className="flex items-center justify-between">
                  <span>Acesse a página completa de FAQ</span>
                  <Button
                    variant="outline"
                    className="ml-4 transition-transform hover:scale-105"
                    onClick={() => (window.location.href = '/faq')}
                  >
                    Ir para FAQ
                  </Button>
                </div>
              </AccordionItem>
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
          <motion.div
            className="mb-8 space-y-4 text-center md:mb-12"
            transition={transition}
            variants={variants}
          >
            <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
              Sobre Nós
            </h1>
            <p className="text-foreground/60 mx-auto max-w-2xl text-lg">
              Conheça a equipe por trás do Knowly
            </p>
          </motion.div>
          <motion.div
            className="text-foreground/80 mb-8 max-w-4xl text-justify text-base leading-relaxed sm:text-lg md:mb-12 md:text-xl"
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
              <Link
                key={index}
                to={owner.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-full w-full items-center justify-center"
              >
                <Card className="hover:border-primary/50 from-background to-background/50 flex h-[180px] w-full max-w-[280px] flex-col items-center justify-center bg-gradient-to-br p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-2xl sm:h-[200px] md:max-w-none lg:h-[220px]">
                  <div className="relative">
                    <img
                      src={owner.image}
                      alt={owner.name}
                      className="ring-primary/20 hover:ring-primary/50 h-16 w-16 rounded-full object-cover shadow-lg ring-2 transition-all sm:h-20 sm:w-20 md:h-24 md:w-24"
                    />
                    <div className="border-background absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-2 bg-green-500"></div>
                  </div>
                  <span className="mt-3 text-center text-xs leading-tight font-semibold sm:text-sm md:mt-4">
                    {owner.name}
                  </span>
                  <span className="text-muted-foreground mt-2 text-center text-xs leading-tight font-light sm:text-sm">
                    {owner.role}
                  </span>
                </Card>
              </Link>
            ))}
          </motion.div>
        </motion.section>
        <Footer />
      </Layout>
    </Background>
  )
}
