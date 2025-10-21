import { motion } from 'framer-motion'
import { h1, h2, p, ul, li } from '@/shared/components/typography'

export function PlaygroundTestingPage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-lg max-w-none"
    >
      {h1({ children: 'Testando sua Base de Conhecimento no Playground' })}

      {h2({ children: 'O que é o Playground?' })}
      {p({
        children: (
          <>
            O Playground é uma área do nosso site feita para você testar, na
            prática, as bases de conhecimento que criou. Ele funciona como um
            chat, parecido com o ChatGPT ou o Gemini, onde você pode conversar
            com a sua base e ver as respostas geradas pela inteligência
            artificial.
          </>
        )
      })}

      {h2({ children: 'Como funciona?' })}
      {ul({
        children: (
          <>
            {li({
              children: <>Escolha qual base de conhecimento você quer testar.</>
            })}
            {li({
              children: (
                <>
                  Envie perguntas ou comandos (prompts) no chat, como faria em
                  um atendimento real.
                </>
              )
            })}
            {li({
              children: (
                <>
                  Veja as respostas geradas na hora, usando os documentos e
                  informações que você cadastrou.
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: 'Por que usar o Playground?' })}
      {p({
        children: (
          <>
            O Playground é a maneira mais fácil e rápida de conferir se sua base
            está funcionando como esperado. Você pode testar diferentes
            perguntas, ajustar seus documentos e experimentar os modelos antes
            de integrar a IA ao seu site ou sistema.
          </>
        )
      })}
    </motion.article>
  )
}

export default PlaygroundTestingPage
