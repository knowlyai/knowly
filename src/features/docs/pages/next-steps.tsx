import { motion } from 'framer-motion'
import { h1, h2, p, ul, li } from '@/shared/components/typography'

export function NextStepsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {h1({ children: 'Próximos Passos' })}

      {p({
        children: (
          <>
            Estamos constantemente inovando e desenvolvendo novas funcionalidades
            para tornar o Knowly ainda mais poderoso e fácil de usar. Confira o
            que estamos planejando para o futuro da plataforma.
          </>
        )
      })}

      {h2({ children: 'Roadmap de Novas Features' })}

      {h2({ children: '🤖 Sistema de Chatbot Multi-Tenant (Em Desenvolvimento)' })}
      {p({
        children: (
          <>
            Nossa próxima grande funcionalidade é um{' '}
            <strong>sistema de chatbot multi-tenant</strong> completo que
            simplificará drasticamente a integração do Knowly em suas
            plataformas.
          </>
        )
      })}

      {p({
        children: (
          <>
            <strong>O que é?</strong>
          </>
        )
      })}
      {p({
        children: (
          <>
            Um sistema de chatbot gerenciado e hospedado pela Knowly que você
            poderá integrar diretamente em seus canais de atendimento, sem
            precisar se preocupar com infraestrutura, webhooks ou gerenciamento
            de APIs.
          </>
        )
      })}

      {p({
        children: (
          <>
            <strong>Benefícios:</strong>
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  <strong>Zero configuração de infraestrutura:</strong> Não
                  será mais necessário criar e manter servidores para consumir
                  as APIs das bases de conhecimento
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Integração simplificada:</strong> Basta conectar suas
                  contas do WhatsApp Business, Instagram, ou outras plataformas
                  diretamente no painel do Knowly
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Gerenciamento centralizado:</strong> Controle todos
                  os seus chatbots de diferentes plataformas em um único lugar
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Multi-tenant:</strong> Suporte a múltiplas empresas e
                  organizações com isolamento completo de dados
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Escalabilidade automática:</strong> Nossa
                  infraestrutura cuida de todo o dimensionamento automaticamente
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Monitoramento em tempo real:</strong> Acompanhe
                  métricas de conversas, satisfação e performance dos chatbots
                </>
              )
            })}
          </>
        )
      })}

      {p({
        children: (
          <>
            <strong>Plataformas suportadas:</strong>
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({ children: '✅ WhatsApp Business' })}
            {li({ children: '✅ Instagram Direct Messages' })}
            {li({ children: '✅ Website (Widget de chat embarcado)' })}
            {li({ children: '🔜 Facebook Messenger' })}
            {li({ children: '🔜 Telegram' })}
            {li({ children: '🔜 Slack' })}
            {li({
              children: '🔜 E-commerce (integração com Shopify, WooCommerce, etc.)'
            })}
          </>
        )
      })}

      {p({
        children: (
          <>
            <strong>Como funcionará:</strong>
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  <strong>Passo 1:</strong> No painel do Knowly, acesse a seção
                  "Chatbots"
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Passo 2:</strong> Selecione a plataforma que deseja
                  integrar (WhatsApp, Instagram, Website, etc.)
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Passo 3:</strong> Conecte sua conta seguindo o fluxo
                  de autenticação simplificado
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Passo 4:</strong> Associe uma ou mais bases de
                  conhecimento ao chatbot
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Passo 5:</strong> Configure opções como horário de
                  atendimento, mensagens de boas-vindas, e regras de escalação
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Passo 6:</strong> Ative o chatbot e comece a receber
                  atendimentos automatizados!
                </>
              )
            })}
          </>
        )
      })}

      {h2({ children: '📊 Análises e Insights Avançados' })}
      {p({
        children: (
          <>
            Além do chatbot multi-tenant, estamos desenvolvendo um sistema
            completo de análises para você entender melhor como seus clientes
            interagem com a IA:
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children:
                'Dashboard com métricas de performance das bases de conhecimento'
            })}
            {li({
              children: 'Análise de sentimento das conversas'
            })}
            {li({
              children: 'Identificação de perguntas frequentes não respondidas'
            })}
            {li({
              children:
                'Sugestões de melhoria para otimizar suas bases de conhecimento'
            })}
            {li({
              children: 'Relatórios de satisfação do cliente'
            })}
          </>
        )
      })}

      {h2({ children: '🔧 Customização Avançada de Respostas' })}
      {ul({
        children: (
          <>
            {li({
              children:
                'Templates personalizáveis para diferentes tipos de perguntas'
            })}
            {li({
              children: 'Tom de voz configurável (formal, casual, técnico, etc.)'
            })}
            {li({
              children: 'Regras de negócio customizadas para tratamento especial de certos tópicos'
            })}
            {li({
              children: 'Respostas com rich media (imagens, vídeos, carrosséis)'
            })}
          </>
        )
      })}

      {h2({ children: '🌐 Suporte Multilíngue' })}
      {ul({
        children: (
          <>
            {li({
              children: 'Detecção automática do idioma do usuário'
            })}
            {li({
              children: 'Respostas em múltiplos idiomas a partir da mesma base de conhecimento'
            })}
            {li({
              children: 'Tradução automática de documentos'
            })}
          </>
        )
      })}

      {h2({ children: '🔗 Integrações com CRMs e Ferramentas' })}
      {ul({
        children: (
          <>
            {li({
              children: 'Integração nativa com Salesforce, HubSpot, Pipedrive'
            })}
            {li({
              children: 'Webhooks personalizados para integração com qualquer sistema'
            })}
            {li({
              children: 'API de eventos para rastreamento de conversas'
            })}
          </>
        )
      })}

      {h2({ children: 'Fique por Dentro' })}
      {p({
        children: (
          <>
            Estamos trabalhando arduamente para trazer essas funcionalidades o
            mais rápido possível. O sistema de chatbot multi-tenant está em fase
            avançada de desenvolvimento e será lançado em breve!
          </>
        )
      })}

      {p({
        children: (
          <>
            Quer ser notificado quando essas features forem lançadas? Entre em{' '}
            <strong>
              <a href="/faq/contact">contato conosco</a>
            </strong>{' '}
            ou acompanhe nossas atualizações.
          </>
        )
      })}
    </motion.div>
  )
}

export default NextStepsPage
