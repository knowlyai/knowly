import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import {
  h1,
  h2,
  p,
} from '@/shared/components/typography'
import { BackgroundBlobs } from '@/shared/components/background-blobs'


export function DocsT1Page() {
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
              {h1({ children: 'Teste Sidebar' })}

              {h2({ children: 'Por que criamos o Knowly?' })}
              {p({
                children: (
                  <>
                    A inteligência artificial está mudando a forma como empresas trabalham, trazendo mais agilidade e eficiência para o dia a dia. Mas, para a maioria dos negócios, usar IA ainda é caro e complicado: exige conhecimento técnico, tempo e investimento alto em tecnologia.
                  </>
                ),
              })}
              {p({
                children: (
                  <>
                    O Knowly nasceu para simplificar esse cenário. Queremos que qualquer empresa consiga aproveitar o poder dos grandes modelos de linguagem para responder dúvidas, organizar informações e automatizar tarefas, sem precisar se preocupar com detalhes técnicos ou infraestrutura.
                  </>
                ),
              })}
              {p({
                children: (
                  <>
                    Nossa plataforma permite que você envie seus próprios documentos e, em poucos cliques, já tenha uma base de conhecimento inteligente pronta para ser usada no seu atendimento, site ou operação interna. Tudo isso com segurança, praticidade e custos acessíveis.
                  </>
                ),
              })}
              {p({
                children: (
                  <>
                    O objetivo é ajudar empresas a inovar, ganhar tempo e focar no que realmente importa: crescer e atender melhor seus clientes, usando IA de verdade no dia a dia.
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

export default DocsT1Page
