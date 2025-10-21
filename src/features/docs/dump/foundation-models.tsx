import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { h1, h2, p, ul, li } from '@/shared/components/typography'
import { BackgroundBlobs } from '@/shared/components/background-blobs'

export function DocsModelsPage() {
  return (
    <Background className="min-h-screen">
      <BackgroundBlobs />
      <Layout className="w-full">
        <main className="flex flex-col items-center justify-center p-12">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            <section>
              {h1({ children: 'Modelos de Fundação AWS' })}

              {h2({ children: 'O que são modelos de fundação?' })}
              {p({
                children: (
                  <>
                    Modelos de fundação são inteligências artificiais treinadas
                    para entender e gerar textos, responder perguntas, resumir
                    informações e até criar conteúdos. Eles servem como base
                    para várias aplicações de IA, desde chatbots até análise de
                    documentos.
                  </>
                )
              })}

              {h2({ children: 'Principais modelos disponíveis na AWS' })}
              {ul({
                children: (
                  <>
                    {li({
                      children: (
                        <>
                          <strong>Amazon Titan:</strong> Modelo versátil para
                          tarefas do dia a dia, como responder perguntas,
                          resumir textos e organizar informações. É uma ótima
                          escolha para quem busca equilíbrio entre custo e
                          desempenho.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          <strong>Anthropic Claude:</strong> Ideal para
                          conversas mais longas, respostas detalhadas e
                          situações que exigem mais segurança e controle. Muito
                          usado em chatbots avançados e assistentes virtuais.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          <strong>AI21 Labs:</strong> Especialista em geração de
                          textos criativos, artigos, e até mesmo conteúdos
                          técnicos. Indicado para quem precisa de textos mais
                          elaborados ou criativos.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          <strong>Cohere:</strong> Focado em análise de
                          linguagem, classificação de textos e extração de
                          informações. Bom para automação de processos e análise
                          de grandes volumes de dados.
                        </>
                      )
                    })}
                  </>
                )
              })}

              {h2({ children: 'Quando usar cada modelo?' })}
              {ul({
                children: (
                  <>
                    {li({
                      children: (
                        <>
                          <strong>
                            Precisa de respostas rápidas e gerais?
                          </strong>{' '}
                          Use o <b>Amazon Titan</b>.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          <strong>
                            Vai criar um chatbot ou assistente virtual que
                            precisa conversar bastante?
                          </strong>{' '}
                          O <b>Claude</b> é uma ótima opção.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          <strong>
                            Quer gerar textos criativos ou técnicos?
                          </strong>{' '}
                          Experimente o <b>AI21 Labs</b>.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          <strong>
                            Precisa analisar, classificar ou organizar muitos
                            textos?
                          </strong>{' '}
                          O <b>Cohere</b> pode ajudar.
                        </>
                      )
                    })}
                  </>
                )
              })}

              {p({
                children: (
                  <>
                    Com esses modelos, você pode escolher a solução que mais
                    combina com o seu projeto, sem se preocupar com a
                    complexidade técnica. Basta selecionar o modelo e começar a
                    usar!
                  </>
                )
              })}
            </section>
          </motion.article>
        </main>
      </Layout>
    </Background>
  )
}

export default DocsModelsPage
