import { motion } from 'framer-motion'
import { h1, h2, p, ul, li, pre } from '@/shared/components/typography'

export function IntegrationInstagramPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {h1({ children: 'Integração com Instagram' })}

      {p({
        children: (
          <>
            Automatize respostas nas mensagens diretas (DMs) do Instagram usando a
            API do Knowly para responder automaticamente perguntas dos usuários
            com base na sua base de conhecimento.
          </>
        )
      })}

      {h2({ children: 'Passo 1: Configurar Instagram Business Account' })}
      {p({
        children: (
          <>
            Para usar a API do Instagram, você precisa ter uma{' '}
            <strong>Conta Business do Instagram</strong> conectada a uma{' '}
            <strong>Página do Facebook</strong>:
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  Acesse{' '}
                  <a
                    href="https://business.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Meta Business Suite
                  </a>
                </>
              )
            })}
            {li({
              children: (
                <>
                  Conecte sua conta do Instagram a uma Página do Facebook
                </>
              )
            })}
            {li({
              children: (
                <>
                  Converta para uma <strong>Conta Business</strong> no Instagram
                </>
              )
            })}
            {li({
              children: (
                <>
                  Configure as permissões necessárias:{' '}
                  <code>instagram_basic</code>, <code>instagram_manage_messages</code>
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: 'Passo 2: Obter Token de Acesso' })}
      {p({
        children: (
          <>
            No{' '}
            <a
              href="https://developers.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              Meta for Developers
            </a>
            , crie um app e obtenha um token de acesso com as permissões
            necessárias para gerenciar mensagens do Instagram.
          </>
        )
      })}

      {h2({ children: 'Passo 3: Configurar Webhook' })}
      {p({
        children: (
          <>
            Configure um webhook para receber notificações de mensagens diretas:
          </>
        )
      })}

      {pre({
        children: `# URL do Webhook
https://seu-servidor.com/webhook/instagram

# Assine o evento: messages
# Receberá notificações quando usuários enviarem DMs

# Exemplo de payload recebido:
{
  "object": "instagram",
  "entry": [{
    "id": "INSTAGRAM_BUSINESS_ACCOUNT_ID",
    "time": 1704116400,
    "messaging": [{
      "sender": { "id": "USER_ID" },
      "recipient": { "id": "PAGE_ID" },
      "timestamp": 1704116400,
      "message": {
        "mid": "MESSAGE_ID",
        "text": "Qual é o horário de funcionamento?"
      }
    }]
  }]
}`
      })}

      {h2({ children: 'Passo 4: Integrar com Knowly API' })}
      {p({
        children: (
          <>
            Quando receber uma mensagem via webhook, consulte a API do Knowly e
            envie a resposta de volta ao usuário:
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
        children: `const express = require('express');
const app = express();

app.post('/webhook/instagram', async (req, res) => {
  const { entry } = req.body;
  
  // Processar cada mensagem recebida
  for (const event of entry) {
    for (const messaging of event.messaging) {
      const senderId = messaging.sender.id;
      const messageText = messaging.message?.text;
      
      if (!messageText) continue;
      
      // Consultar API do Knowly
      const knowlyResponse = await fetch('https://api.knowly.dev.br/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kb_key: 'knowly_c81a7410-4c69-45e2-b6c6-79205c3a99fd',
          model: 'MISTRAL_SMALL',
          prompt: messageText
        })
      });
      
      const data = await knowlyResponse.json();
      const aiResponse = data.response;
      
      // Enviar resposta via Instagram Messaging API
      await sendInstagramMessage(senderId, aiResponse);
    }
  }
  
  res.sendStatus(200);
});

// Função para enviar mensagem pelo Instagram
async function sendInstagramMessage(recipientId, message) {
  const pageId = 'SEU_INSTAGRAM_BUSINESS_ACCOUNT_ID';
  
  await fetch(\`https://graph.facebook.com/v18.0/\${pageId}/messages\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer SEU_TOKEN_INSTAGRAM'
    },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text: message }
    })
  });
}

// Endpoint de verificação do webhook (obrigatório)
app.get('/webhook/instagram', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode === 'subscribe' && token === 'SEU_TOKEN_DE_VERIFICACAO') {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});`
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

@app.route('/webhook/instagram', methods=['POST'])
def instagram_webhook():
    data = request.json
    
    # Processar mensagens
    for entry in data.get('entry', []):
        for messaging in entry.get('messaging', []):
            sender_id = messaging['sender']['id']
            message_text = messaging.get('message', {}).get('text')
            
            if not message_text:
                continue
            
            # Consultar API do Knowly
            knowly_response = requests.post(
                'https://api.knowly.dev.br/chat',
                headers={
                    'Content-Type': 'application/json',
                },
                json={
                    'kb_key': 'knowly_c81a7410-4c69-45e2-b6c6-79205c3a99fd',
                    'model': 'MISTRAL_SMALL',
                    'prompt': message_text
                }
            )
            
            ai_response = knowly_response.json()['response']
            
            # Enviar resposta pelo Instagram
            send_instagram_message(sender_id, ai_response)
    
    return '', 200

def send_instagram_message(recipient_id, message):
    page_id = 'SEU_INSTAGRAM_BUSINESS_ACCOUNT_ID'
    
    requests.post(
        f'https://graph.facebook.com/v18.0/{page_id}/messages',
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer SEU_TOKEN_INSTAGRAM'
        },
        json={
            'recipient': {'id': recipient_id},
            'message': {'text': message}
        }
    )

@app.route('/webhook/instagram', methods=['GET'])
def verify_webhook():
    mode = request.args.get('hub.mode')
    token = request.args.get('hub.verify_token')
    challenge = request.args.get('hub.challenge')
    
    if mode == 'subscribe' and token == 'SEU_TOKEN_DE_VERIFICACAO':
        return challenge, 200
    return '', 403`
      })}

      {h2({ children: 'Passo 5: Testar a Integração' })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  Envie uma mensagem direta para sua conta Business do Instagram
                </>
              )
            })}
            {li({
              children: (
                <>
                  Verifique se o webhook está recebendo a notificação
                </>
              )
            })}
            {li({
              children: (
                <>
                  Confirme que a API do Knowly está retornando respostas adequadas
                </>
              )
            })}
            {li({
              children: (
                <>
                  Valide se as respostas estão sendo enviadas corretamente ao
                  usuário
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: 'Funcionalidades Avançadas' })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  <strong>Respostas rápidas:</strong> Configure botões de resposta
                  rápida para melhorar a experiência
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Mídia:</strong> Envie imagens ou vídeos junto com as
                  respostas quando apropriado
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Templates:</strong> Use templates pré-aprovados para
                  respostas frequentes
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Horário comercial:</strong> Configure respostas
                  automáticas apenas fora do horário comercial
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: 'Boas Práticas' })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  <strong>Transparência:</strong> Informe aos usuários que estão
                  interagindo com um assistente automático
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Escalação:</strong> Ofereça opção de falar com atendente
                  humano quando necessário
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Tempo de resposta:</strong> Configure timeout adequado
                  (máx. 10 segundos)
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Monitoramento:</strong> Acompanhe métricas de satisfação
                  e qualidade das respostas
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Políticas do Instagram:</strong> Respeite as diretrizes
                  de mensagens automatizadas da plataforma
                </>
              )
            })}
          </>
        )
      })}

      {p({
        children: (
          <>
            Com essa integração, você poderá responder automaticamente mensagens
            diretas no Instagram, melhorando o engajamento com sua audiência e
            fornecendo suporte instantâneo 24/7.
          </>
        )
      })}
    </motion.div>
  )
}

export default IntegrationInstagramPage
