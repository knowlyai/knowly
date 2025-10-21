import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { h1, h2, p, ul, li } from '@/shared/components/typography'
import { BackgroundBlobs } from '@/shared/components/background-blobs'

export function DocsPlansPage() {
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
              {h1({ children: 'Gerenciando seu Plano de Assinatura' })}

              {h2({ children: 'Como alterar seu plano' })}
              {p({
                children: (
                  <>
                    Para gerenciar seu plano de assinatura no Knowly, é só
                    acessar a área do usuário após fazer login. No menu lateral
                    à esquerda, clique em <b>&quot;Assinatura&quot;</b>.
                  </>
                )
              })}
              {ul({
                children: (
                  <>
                    {li({
                      children: (
                        <>
                          Na seção <b>&quot;Plano atual&quot;</b>, procure o
                          botão <b>&quot;Mudar plano&quot;</b> no canto inferior
                          direito.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          Clique em <b>&quot;Mudar plano&quot;</b> para ver as
                          opções disponíveis e escolher o plano que melhor
                          atende às suas necessidades.
                        </>
                      )
                    })}
                    {li({
                      children: (
                        <>
                          Confirme a alteração e pronto! Seu novo plano já
                          estará ativo.
                        </>
                      )
                    })}
                  </>
                )
              })}
              {p({
                children: (
                  <>
                    Assim, você pode ajustar sua assinatura sempre que quiser,
                    de forma rápida e sem complicação.
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

export default DocsPlansPage
