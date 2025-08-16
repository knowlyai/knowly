import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import {
  h1,
  h2,
  p,
  ul,
  li,
} from '@/shared/components/typography'
import { BackgroundBlobs } from '@/shared/components/background-blobs'


export function DocsPage() {
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
              {h1({ children: 'Sobre o Projeto' })}

              {h2({ children: 'Introdução' })}
              {p({
                children: (
                  <>
                    A inteligência artificial (IA) está cada vez mais presente em nossas vidas e, especialmente, no mercado de trabalho. Seu uso é feito em múltiplos setores e contribui para aumento de agilidade e eficiência de diversos processos e atividades. No entanto, os custos para treinar e manter modelos são altos, tornando-se uma opção pouco viável para pequenos e médios empreendedores. Além disso, a complexidade técnica é uma barreira que também impede que muitos implementem esta tecnologia.
                  </>
                ),
              })}
              {p({
                children: (
                  <>
                    Para que o uso de inteligência artificial se torne mais acessível para o público não especializado e com orçamento reduzido, faz-se um estudo para desenvolver uma solução que democratize a utilização de modelos de linguagem grande em empresas que não são de grande porte.
                  </>
                ),
              })}

              {h2({ children: 'Objetivos' })}
              {p({
                children: (
                  <>
                    Desenvolver uma plataforma de IA generativa baseada em modelos de linguagem, especificamente nos large language models (LLMs) que democratize o acesso de pequenas e médias empresas a inferências inteligentes a partir de suas próprias bases de conhecimento, abstraindo toda a complexidade técnica e automatizando pipelines Retrieval-Augmented Generation (RAG) em serviços gerenciados na nuvem, de forma intuitiva e com custos significativamente reduzidos.
                  </>
                ),
              })}

              {h2({ children: 'Objetivos Específicos' })}
              {ul({
                children: (
                  <>
                    {li({
                      children: 'Implementar uma interface intuitiva e simples que permita o upload de documentos para construção automática da base de conhecimento.'
                    })}
                    {li({
                      children: 'Desenvolver mecanismos que automatizem a criação e gerenciamento de bancos de dados vetoriais usando tecnologias escaláveis na nuvem.'
                    })}
                    {li({
                      children: 'Integrar modelos de fundação disponíveis no Amazon Bedrock com bases vetoriais de conhecimento geradas com base nas informações concedidas pelos usuários.'
                    })}
                    {li({
                      children: 'Avaliar o desempenho e a viabilidade econômica da solução desenvolvida para uso por pequenos e médios empreendedores (PME).'
                    })}
                  </>
                ),
              })}

              {h2({ children: 'Justificativa' })}
              {p({
                children: (
                  <>
                    A crescente popularização e impacto das inteligências artificiais generativas, especialmente os modelos de linguagem grande, têm transformado significativamente diversos setores, desde negócios até educação e pesquisa. Entretanto, apesar do potencial dessas tecnologias, o acesso a elas continua restrito devido a barreiras econômicas e tecnológicas. Pequenos empreendedores, estudantes e profissionais que não possuem conhecimento técnico especializado ou orçamento elevado frequentemente encontram dificuldades para se beneficiar plenamente dessas inovações.
                  </>
                ),
              })}
              {p({
                children: (
                  <>
                    Nesse contexto, este projeto tem como justificativa central a democratização dos modelos de linguagem por meio da simplificação e redução significativa das barreiras que limitam seu acesso. Ao desenvolver uma plataforma intuitiva e economicamente viável, pretende-se permitir que usuários sem experiência prévia em inteligência artificial e sem um grande aporte financeiro, possam facilmente gerar inferências de modelos utilizando suas próprias bases de conhecimento. Essa abordagem, conhecida como RAG, possibilita a criação de sistemas altamente especializados e relevantes para necessidades específicas, potencializando assim a inovação em diversos nichos que atualmente estão excluídos dessa revolução tecnológica.
                  </>
                ),
              })}
              {p({
                children: (
                  <>
                    Além disso, ao automatizar o processo desde a ingestão dos documentos até a geração do endpoint de utilização, a plataforma proposta elimina a necessidade de conhecimentos avançados em ciência de dados ou programação e minimiza o custo de acesso à tecnologia, ampliando significativamente o público potencial.
                  </>
                ),
              })}
              {p({
                children: (
                  <>
                    Dessa forma, este projeto atende à demanda por inclusão tecnológica e econômica, ao oferecer às pequenas e médias empresas acesso simplificado a inferências de grandes modelos de linguagem e pipelines RAG automatizados, reduzindo a disparidade no uso dessas tecnologias.
                  </>
                ),
              })}

              {h2({ children: 'Definição do escopo, contextualização e oportunidades' })}
              {p({
                children: (
                  <>
                    O problema abordado neste estudo é a dificuldade enfrentada por pequenos e médios empreendedores para incorporar inteligência artificial generativa em seus processos devido aos elevados custos financeiros e complexidade técnica. Apesar das oportunidades evidentes que essas tecnologias trazem para inovação e eficiência, muitos empreendedores encontram-se excluídos dessa evolução tecnológica. Criar em cima de LLMs de terceiros, como o GPT-4, pode trazer ameaças à segurança, como a exposição de dados proprietários. Outra opção é utilizar modelos de código aberto, como Llama 2, porém hospedá-las exige conhecimento técnico. O último caminho seria criar um modelo próprio (KRISHNAN; HOSANAGAR, 2024). No entanto, o desenvolvimento de chatbots personalizados, por exemplo, pode ter um custo que varia de R$20.000 a R$100.000, dependendo da complexidade, além da necessidade de profissionais da área para fazer o desenvolvimento, o que pode custar R$100.000 ou mais dependendo da duração e escopo do projeto (GESTOR, 2024).
                  </>
                ),
              })}
              {p({
                children: (
                  <>
                    Nesse contexto, a principal oportunidade deste projeto está em democratizar o uso de modelos de linguagem generativos através de uma plataforma que simplifique tecnicamente e torne economicamente viável a criação e utilização de modelos personalizados baseados em RAG. A solução proposta proporciona acesso fácil a tecnologias sofisticadas, permitindo aos empreendedores potencializarem seus serviços e produtos com inteligência artificial, fomentando inovação em diversos setores econômicos e ampliando o público beneficiado por essas ferramentas.
                  </>
                ),
              })}
            </section>
          </motion.article>
        </main>
      </Layout>
    </Background>
  )
}

export default DocsPage
