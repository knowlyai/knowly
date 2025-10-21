import { motion } from 'framer-motion'
import { h1, h2, p, ul, li, pre } from '@/shared/components/typography'

export function IntegrationPage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-lg max-w-none"
    >
      {h1({ children: 'Como integrar com sua base de conhecimento' })}

      {h2({ children: 'Integração simples via API' })}
      {p({
        children: (
          <>
            Depois de criar sua base de conhecimento no Knowly, você pode
            integrá-la facilmente ao seu sistema usando nossa API. O
            funcionamento é parecido com a API da OpenAI, muito usada em
            chatbots de atendimento, como no WhatsApp.
          </>
        )
      })}

      {h2({ children: 'Como funciona?' })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  Você envia um <strong>prompt</strong> (mensagem ou pergunta)
                  para a API, junto com sua chave de acesso.
                </>
              )
            })}
            {li({
              children: (
                <>
                  A API responde com a melhor resposta baseada nos documentos
                  que você enviou para sua base.
                </>
              )
            })}
            {li({
              children: (
                <>
                  É possível usar essa integração em sites, sistemas internos,
                  chatbots e muito mais.
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: 'Exemplo de requisição' })}
      {pre({
        children: `POST https://api.knowly.ai/v1/query
Headers:
  Authorization: Bearer SUA_CHAVE_DE_API
Body:
{
  "prompt": "Como faço para atualizar meus dados cadastrais?",
  "baseId": "sua-base-id"
}`
      })}

      {p({
        children: (
          <>
            A resposta virá em formato JSON, com o texto gerado pela IA usando o
            conhecimento da sua base. Assim, você pode automatizar atendimentos,
            responder dúvidas de clientes ou integrar a IA ao seu sistema de
            forma simples e eficiente.
          </>
        )
      })}
    </motion.article>
  )
}

export default IntegrationPage
