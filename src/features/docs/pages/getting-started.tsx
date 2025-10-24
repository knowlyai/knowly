import { motion } from 'framer-motion'
import { h1, h2, p, ul, li, pre } from '@/shared/components/typography'

export function GettingStartedPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {h1({ children: 'Comece a Usar o Knowly' })}

      {p({
        children: (
          <>
            Siga este guia passo a passo para começar a usar a plataforma Knowly
            e criar sua primeira base de conhecimento de IA.
          </>
        )
      })}

      {h2({ children: 'Passo 1: Criar uma Conta' })}
      {p({
        children: (
          <>Para começar, você precisa criar uma conta gratuita no Knowly:</>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  Acesse a página de{' '}
                  <strong>
                    <a href="/sign-up">cadastro</a>
                  </strong>
                </>
              )
            })}
            {li({
              children: <>Preencha seus dados: nome, e-mail e senha</>
            })}
            {li({
              children: <>Confirme seu e-mail através do link enviado</>
            })}
            {li({
              children: (
                <>
                  Faça <strong>login</strong> com suas credenciais
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: 'Passo 2: Criar uma Base de Conhecimento' })}
      {p({
        children: (
          <>
            Após fazer login, você pode criar sua primeira base de conhecimento:
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  Acesse <strong>&quot;Minhas Bases&quot;</strong> no menu do
                  usuário
                </>
              )
            })}
            {li({
              children: (
                <>
                  Clique em <strong>&quot;Nova Base&quot;</strong>
                </>
              )
            })}
            {li({
              children: (
                <>
                  Escolha um <strong>nome</strong> para sua base
                </>
              )
            })}
            {li({
              children: (
                <>
                  Selecione o <strong>modelo de IA</strong> que deseja usar (ex:
                  Amazon Bedrock)
                </>
              )
            })}
            {li({
              children: (
                <>
                  Faça <strong>upload dos documentos PDF</strong> que servirão
                  como base de conhecimento
                </>
              )
            })}
            {li({
              children: (
                <>
                  Clique em <strong>&quot;Criar Base&quot;</strong>
                </>
              )
            })}
          </>
        )
      })}

      {p({
        children: (
          <>
            Aguarde alguns instantes enquanto o sistema processa seus
            documentos. O tempo varia conforme a quantidade e tamanho dos
            arquivos.
          </>
        )
      })}

      {h2({ children: 'Passo 3: Obter a Chave da Base' })}
      {p({
        children: (
          <>
            Depois que sua base estiver pronta, você precisa obter a chave de
            API para integrá-la:
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: <>Na lista de bases, clique na base que você criou</>
            })}
            {li({
              children: (
                <>
                  Na página de detalhes, copie a <strong>Chave da Base</strong>{' '}
                  (Base ID)
                </>
              )
            })}
            {li({
              children: (
                <>
                  Copie também sua <strong>Chave de API</strong> (API Key) nas
                  configurações da conta
                </>
              )
            })}
          </>
        )
      })}

      {p({
        children: (
          <>
            <strong>Importante:</strong> Guarde essas chaves em um local seguro.
            Você precisará delas para fazer requisições à API.
          </>
        )
      })}

      {h2({ children: 'Passo 4: Testar no Playground' })}
      {p({
        children: (
          <>
            Antes de integrar, você pode testar sua base de conhecimento no
            Playground:
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  Clique em <strong>&quot;Testar no Playground&quot;</strong> na
                  página da base
                </>
              )
            })}
            {li({
              children: (
                <>
                  Digite perguntas relacionadas aos documentos que você enviou
                </>
              )
            })}
            {li({
              children: (
                <>
                  Veja as respostas geradas pela IA com base no conhecimento da
                  sua base
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: 'Passo 5: Integrar com seu Código' })}
      {p({
        children: (
          <>
            Agora você pode integrar a base de conhecimento ao seu sistema
            usando nossa API REST:
          </>
        )
      })}

      {pre({
        children: `# Exemplo usando cURL
curl -X POST https://api.knowly.dev.br/chat \\
  -H "Content-Type: application/json" \\
  -d '{
    "kb_key": "knowly_c81a7410-4c69-45e2-b6c6-79205c3a99fd",
    "model": "MISTRAL_SMALL",
    "prompt": "Qual é o horário de atendimento?"
  }'`
      })}

      {p({
        children: (
          <>
            <strong>Exemplo em JavaScript/Node.js:</strong>
          </>
        )
      })}

      {pre({
        children: `fetch('https://api.knowly.dev.br/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    kb_key: 'knowly_c81a7410-4c69-45e2-b6c6-79205c3a99fd',
    model: 'MISTRAL_SMALL',
    prompt: 'Qual é o horário de atendimento?'
  })
})
  .then(response => response.json())
  .then(data => console.log(data.response));`
      })}

      {p({
        children: (
          <>
            <strong>Exemplo em Python:</strong>
          </>
        )
      })}

      {pre({
        children: `import requests

response = requests.post(
    'https://api.knowly.dev.br/chat',
    headers={
        'Content-Type': 'application/json',
    },
    json={
        'kb_key': 'knowly_c81a7410-4c69-45e2-b6c6-79205c3a99fd',
        'model': 'MISTRAL_SMALL',
        'prompt': 'Qual é o horário de atendimento?'
    }
)

data = response.json()
print(data['response'])`
      })}

      {h2({ children: 'Próximos Passos' })}
      {p({
        children: (
          <>
            Agora que você já sabe como começar, explore mais recursos da
            plataforma:
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  Aprenda mais sobre{' '}
                  <strong>
                    <a href="/docs/foundation-models">Modelos de Fundação</a>
                  </strong>
                </>
              )
            })}
            {li({
              children: (
                <>
                  Veja detalhes sobre{' '}
                  <strong>
                    <a href="/docs/knowledge-bases">
                      Gerenciamento de Bases de Conhecimento
                    </a>
                  </strong>
                </>
              )
            })}
            {li({
              children: (
                <>
                  Explore opções avançadas de{' '}
                  <strong>
                    <a href="/docs/integration">Integração</a>
                  </strong>
                </>
              )
            })}
            {li({
              children: (
                <>
                  Gerencie sua{' '}
                  <strong>
                    <a href="/docs/subscription-management">Assinatura</a>
                  </strong>
                </>
              )
            })}
          </>
        )
      })}

      {p({
        children: (
          <>
            Precisa de ajuda? Consulte nossa{' '}
            <strong>
              <a href="/faq">página de FAQ</a>
            </strong>{' '}
            ou entre em{' '}
            <strong>
              <a href="/faq/contact">contato</a>
            </strong>
            .
          </>
        )
      })}
    </motion.div>
  )
}

export default GettingStartedPage
