import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { h1, h2, p, ul, li } from '@/shared/components/typography'
import { BackgroundBlobs } from '@/shared/components/background-blobs'

export function DocsBasesPage() {
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
              {h1({ children: 'Gerenciando Bases de Conhecimento' })}

              {h2({ children: 'Como criar, editar e excluir suas bases' })}
              {p({
                children: (
                  <>
                    Gerenciar suas bases de conhecimento no Knowly é simples e
                    rápido. Basta acessar as configurações do seu perfil após
                    fazer login e selecionar a opção{' '}
                    <b>&quot;Minhas bases&quot;</b>.
                  </>
                )
              })}

              {ul({
                children: (
                  <>
                    {li({
                      children: (
                        <>
                          <b>Para criar uma base:</b> Clique em{' '}
                          <b>&quot;Nova base&quot;</b>, escolha um nome e envie
                          os documentos que deseja usar. Pronto! Sua base estará
                          disponível para consultas e integrações assim que
                          terminar de ser criada.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          <b>Para editar:</b> Selecione uma base existente na
                          lista para ver detalhes, adicionar ou remover
                          documentos, ou atualizar informações.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          <b>Para excluir:</b> Escolha a base desejada e clique
                          em <b>&quot;Excluir&quot;</b>. Confirme a ação para
                          remover a base do sistema.
                        </>
                      )
                    })}
                  </>
                )
              })}

              {p({
                children: <></>
              })}
            </section>
          </motion.article>
        </main>
      </Layout>
    </Background>
  )
}

export default DocsBasesPage
