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

const plans = [
  {
    title: 'Personal',
    price: '$5',
    features: ['2 Knowledge Bases', 'Sandbox', 'Single AI model'],
    buttonText: 'Get Started'
  },
  {
    title: 'Professional',
    price: '$10',
    features: ['10 Knowledge Bases', 'Sandbox', 'Up to 5 AI models'],
    buttonText: 'Get Started'
  },
  {
    title: 'Business',
    price: '$50',
    features: ['50 Knowledge Bases', 'Sandbox', 'Any AI model available'],
    buttonText: 'Get Started'
  }
]

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

const process = [
  {
    title: 'You Upload',
    content: 'Upload the PDF files you wish to make up the knowledge base',
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
    title: 'We Build',
    content: 'We use the files to train a Gen AI model',
    image: (
      <DotLottieReact
        src="https://lottie.host/e10d7ded-6bde-4049-afd0-1d902c61d1d2/oSwowUt9Qm.lottie"
        loop
        autoplay
      />
    )
  },
  {
    title: 'You Enjoy',
    content: 'After the model is done, you can try it and use it as you wish',
    image: (
      <DotLottieReact
        src="https://lottie.host/e84fe9c7-0ada-4dcb-a6c0-3e5ae46e1354/GgsWdQCrtV.lottie"
        loop
        autoplay
      />
    )
  }
]

function LogoCarousel() {
  const logos = [
    'https://store-images.s-microsoft.com/image/apps.22898.1ee6619e-8cd6-4c91-a459-3abe6a6cf7b3.84da202a-9b47-4a76-be2c-79f143c64050.21add500-ed5b-42ee-b87d-ee415ae071fc',
    'https://play-lh.googleusercontent.com/d2zqBFBEymSZKaVg_dRo1gh3hBFn7_Kl9rO74xkDmnJeLgDW0MoJD3cUx0QzZN6jdsg=w240-h480-rw',
    'https://t2.tudocdn.net/716766?w=824&h=494',
    'https://www.stickersdevs.com.br/wp-content/uploads/2021/03/amazon-logo-sticker-adesivo-devs.jpg',
    'https://iguatemi.com.br/saopaulo/sites/saopaulo/files/2021-10/mistral.jpg'
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
              alt="Bedrock model logo"
              draggable={false}
              className="h-26 w-26 rounded-md object-cover shadow-lg select-none"
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

const title = 'Think beyond with Knowly'
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
            A productivity plataform that transforms your documents into a
            powerful, custom AI knowledge base. Stay organized, efficient, and
            empowered.
          </motion.p>

          <motion.div
            className="mt-2 flex gap-6"
            transition={transition}
            variants={variants}
          >
            <Button>Get Started</Button>
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
            How Knowly Works
          </motion.h1>
          <motion.div
            className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
            transition={transition}
            variants={variants}
          >
            {process.map((content, idx) => (
              <Card
                key={idx}
                className="bg-background relative flex flex-col items-center border-none"
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
            Pricing
          </motion.h1>
          <motion.div
            className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            transition={transition}
            variants={variants}
          >
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className="from-background to-background/80 w-full border-none bg-gradient-to-b text-center"
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
                  <Button className="w-full">Get started</Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </motion.section>
        <motion.section
          id="faq"
          className="flex flex-col items-center justify-center"
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
          <h1 className="mb-12 text-6xl font-semibold">FAQ</h1>
          <Accordion className="w-250">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} title={faq.title}>
                {faq.content}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>
        <section
          id="about-us"
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
