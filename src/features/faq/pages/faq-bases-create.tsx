import { Background } from '@/shared/components/background'
import { BackgroundBlobs } from '@/shared/components/background-blobs'
import { Layout } from '@/shared/components/layout'
import { Card, CardContent } from '@/shared/components/card'
import { motion } from 'framer-motion'

export function FAQBasesCreatePage() {
  return (
    <Background className="relative isolate overflow-hidden py-24">
      <BackgroundBlobs />
      <Layout>
        <div className="mx-auto mb-8 w-full max-w-3xl">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <a href="/faq" className="text-primary font-medium hover:underline">
              FAQ
            </a>
            <span className="mx-1">{'>'}</span>
            <span className="text-foreground font-semibold">
              Criar nova base
            </span>
          </div>
        </div>
        <motion.h2
          className="text-foreground mb-12 text-center text-4xl font-bold sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Como criar uma nova base de conhecimento?
        </motion.h2>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
          {/* Seção 1: Passo a passo prático */}
          <Card className="bg-card w-full">
            <CardContent className="flex flex-col gap-6 p-8">
              <h2 className="text-foreground mb-2 text-2xl font-semibold">
                Passo a passo para criar sua base de conhecimento
              </h2>
              <ol className="text-muted-foreground flex list-inside list-decimal flex-col gap-4 text-lg">
                <li>
                  Faça login na plataforma com seu usuário e senha.
                  {/* Espaço para imagem de tela de login */}
                  <div className="bg-muted text-muted-foreground my-2 flex h-32 w-full items-center justify-center rounded-md text-sm">
                    [Imagem da tela de login]
                  </div>
                </li>
                <li>
                  Acesse seu perfil e vá até a seção{' '}
                  <b>Bases de conhecimento</b>.
                  {/* Espaço para imagem do perfil */}
                  <div className="bg-muted text-muted-foreground my-2 flex h-32 w-full items-center justify-center rounded-md text-sm">
                    [Imagem do perfil e menu de bases]
                  </div>
                </li>
                <li>
                  Clique no botão <b>Criar uma nova base</b>.
                  {/* Espaço para imagem do botão */}
                  <div className="bg-muted text-muted-foreground my-2 flex h-32 w-full items-center justify-center rounded-md text-sm">
                    [Imagem do botão Criar uma nova base]
                  </div>
                </li>
                <li>
                  Escolha o modelo de base de conhecimento desejado.
                  {/* Espaço para imagem de seleção de modelo */}
                  <div className="bg-muted text-muted-foreground my-2 flex h-32 w-full items-center justify-center rounded-md text-sm">
                    [Imagem da seleção de modelo]
                  </div>
                </li>
                <li>
                  Faça upload dos documentos que irão compor sua base.
                  {/* Espaço para imagem de upload */}
                  <div className="bg-muted text-muted-foreground my-2 flex h-32 w-full items-center justify-center rounded-md text-sm">
                    [Imagem da tela de upload]
                  </div>
                </li>
                <li>
                  Aguarde enquanto sua base é criada. <br />
                  <span className="text-sm text-yellow-600 italic">
                    Atenção: esse processo pode demorar alguns minutos,
                    especialmente se você enviar muitos arquivos.
                  </span>
                  {/* Espaço para imagem de carregamento */}
                  <div className="bg-muted text-muted-foreground my-2 flex h-32 w-full items-center justify-center rounded-md text-sm">
                    [Imagem de carregamento/criação da base]
                  </div>
                </li>
                <li>
                  Pronto! Sua base estará disponível para uso via API e para
                  testes no ambiente sandbox.
                  {/* Espaço para imagem de base criada */}
                  <div className="bg-muted text-muted-foreground my-2 flex h-32 w-full items-center justify-center rounded-md text-sm">
                    [Imagem da base criada e opções de uso]
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Seção 2: Como funciona por trás */}
          <Card className="bg-card w-full">
            <CardContent className="flex flex-col gap-4 p-8">
              <h2 className="text-foreground mb-2 text-2xl font-semibold">
                O que acontece por trás do sistema?
              </h2>
              <p className="text-muted-foreground text-lg">
                Após o upload dos arquivos, o sistema salva seus documentos e
                inicia o treinamento do modelo de IA escolhido utilizando
                exclusivamente os arquivos enviados por você. Nenhum dado
                externo é utilizado para treinar sua base, garantindo
                privacidade e personalização.
              </p>
              {/* Espaço para esquema ilustrativo */}
              <div className="bg-muted text-muted-foreground my-2 flex h-40 w-full items-center justify-center rounded-md text-sm">
                [Esquema ilustrativo do fluxo de criação da base]
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Possíveis erros e soluções */}
          <Card className="bg-card w-full">
            <CardContent className="flex flex-col gap-4 p-8">
              <h2 className="text-foreground mb-2 text-2xl font-semibold">
                Possíveis erros e como resolver
              </h2>
              <ul className="text-muted-foreground flex list-disc flex-col gap-3 pl-4 text-lg">
                <li>
                  <b>Limite de bases atingido:</b> Você já criou o máximo de
                  bases permitido pelo seu plano.
                  <br />
                  <span className="text-sm">
                    Solução: Assine um plano superior ou exclua uma base
                    existente.
                  </span>
                </li>
                <li>
                  <b>Limite de armazenamento atingido:</b> Você já utilizou todo
                  o espaço de arquivos do seu plano.
                  <br />
                  <span className="text-sm">
                    Solução: Assine um plano superior ou remova arquivos de
                    outras bases para liberar espaço.
                  </span>
                </li>
                <li>
                  <b>Modelo indisponível:</b> O modelo de base desejado não está
                  disponível no seu plano.
                  <br />
                  <span className="text-sm">
                    Solução: Assine um plano superior para acessar esse modelo.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </Background>
  )
}
