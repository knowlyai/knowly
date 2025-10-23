import { motion } from 'framer-motion'
import { h1, h2, p, ul, li, pre } from '@/shared/components/typography'

export function IntegrationWhatsAppPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {h1({ children: 'Integração com WhatsApp Business' })}

      {p({
        children: (
          <>
            Automatize o atendimento no WhatsApp Business usando a API do Knowly
            para responder automaticamente mensagens de clientes com base na sua
            base de conhecimento.
          </>
        )
      })}

      {h2({ children: 'Passo 1: Configurar o WhatsApp Business API' })}
      {p({
        children: (
          <>
            Primeiro, você precisa ter acesso à{' '}
            <strong>WhatsApp Business API</strong>. Você pode configurar através
            de:
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  <strong>Meta Business Platform</strong> - Acesse{' '}
                  <a
                    href="https://business.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    business.facebook.com
                  </a>{' '}
                  e configure sua conta
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Provedores terceiros</strong> - Como Twilio, 360Dialog,
                  ou MessageBird
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: 'Passo 2: Configurar Webhook' })}
      {p({
        children: (
          <>
            Configure um webhook para receber mensagens dos clientes. Este
            endpoint receberá as mensagens enviadas ao seu número do WhatsApp
            Business.
          </>
        )
      })}

      {p({
        children: (
          <>
            <strong>Exemplo de configuração de webhook:</strong>
          </>
        )
      })}

      {pre({
        children: `# URL do Webhook
https://seu-servidor.com/webhook/whatsapp

# Método: POST
# Receberá mensagens no formato:
{
  "from": "5511999999999",
  "message": "Qual é o horário de atendimento?",
  "timestamp": "2025-01-15T10:30:00Z"
}`
      })}

      {h2({ children: 'Passo 3: Integrar com Knowly API' })}
      {p({
        children: (
          <>
            No seu servidor, ao receber uma mensagem via webhook, faça uma
            requisição para a API do Knowly para obter a resposta:
          </>
        )
      })}

      {p({
        children: (
          <>
            <strong>Exemplo em Node.js:</strong>
          </>
        )
      })}

      {pre({
        children: `// Servidor Express recebendo webhook do WhatsApp
app.post('/webhook/whatsapp', async (req, res) => {
  const { from, message } = req.body;
  
  // Consultar API do Knowly
  const knowlyResponse = await fetch('https://api.knowly.ai/v1/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer SUA_CHAVE_DE_API'
    },
    body: JSON.stringify({
      prompt: message,
      baseId: 'SUA_BASE_ID'
    })
  });
  
  const data = await knowlyResponse.json();
  const aiResponse = data.response;
  
  // Enviar resposta de volta para o WhatsApp
  await sendWhatsAppMessage(from, aiResponse);
  
  res.sendStatus(200);
});

// Função para enviar mensagem pelo WhatsApp Business API
async function sendWhatsAppMessage(to, message) {
  await fetch('https://graph.facebook.com/v18.0/SEU_PHONE_NUMBER_ID/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer SEU_TOKEN_WHATSAPP'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      text: { body: message }
    })
  });
}`
      })}

      {p({
        children: (
          <>
            <strong>Exemplo em Python:</strong>
          </>
        )
      })}

      {pre({
        children: `from flask import Flask, request
import requests

app = Flask(__name__)

@app.route('/webhook/whatsapp', methods=['POST'])
def whatsapp_webhook():
    data = request.json
    from_number = data['from']
    message = data['message']
    
    # Consultar API do Knowly
    knowly_response = requests.post(
        'https://api.knowly.ai/v1/query',
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer SUA_CHAVE_DE_API'
        },
        json={
            'prompt': message,
            'baseId': 'SUA_BASE_ID'
        }
    )
    
    ai_response = knowly_response.json()['response']
    
    # Enviar resposta pelo WhatsApp Business API
    send_whatsapp_message(from_number, ai_response)
    
    return '', 200

def send_whatsapp_message(to, message):
    requests.post(
        f'https://graph.facebook.com/v18.0/SEU_PHONE_NUMBER_ID/messages',
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer SEU_TOKEN_WHATSAPP'
        },
        json={
            'messaging_product': 'whatsapp',
            'to': to,
            'text': {'body': message}
        }
    )`
      })}

      {h2({ children: 'Passo 4: Testar a Integração' })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  Envie uma mensagem para seu número do WhatsApp Business
                </>
              )
            })}
            {li({
              children: (
                <>
                  Verifique se o webhook está recebendo a mensagem
                </>
              )
            })}
            {li({
              children: (
                <>
                  Confirme que a API do Knowly está retornando respostas
                </>
              )
            })}
            {li({
              children: (
                <>
                  Valide se as respostas estão sendo enviadas de volta ao cliente
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: 'Dicas Importantes' })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  <strong>Timeout:</strong> Configure um tempo limite razoável
                  para requisições (recomendado: 10-15 segundos)
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Tratamento de erros:</strong> Implemente mensagens de
                  fallback caso a API não responda
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Rate limiting:</strong> Respeite os limites de taxa do
                  WhatsApp Business API
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Contexto:</strong> Considere manter histórico de
                  conversas para melhorar as respostas
                </>
              )
            })}
          </>
        )
      })}

      {p({
        children: (
          <>
            Com essa integração, seu WhatsApp Business responderá automaticamente
            aos clientes usando o conhecimento da sua base, proporcionando
            atendimento 24/7 e reduzindo a carga de trabalho da equipe.
          </>
        )
      })}
    </motion.div>
  )
}

export default IntegrationWhatsAppPage
