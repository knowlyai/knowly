import { motion } from 'framer-motion'
import { h1, h2, p, ul, li } from '@/shared/components/typography'

export function KnowledgeBasesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {h1({ children: 'Gerenciando Bases de Conhecimento' })}

      {h2({ children: 'Como criar, editar e excluir suas bases' })}
      {p({
        children: (
          <>
            Gerenciar suas bases de conhecimento no Knowly é simples e rápido.
            Basta acessar as configurações do seu perfil após fazer login e
            selecionar a opção <strong>&quot;Minhas bases&quot;</strong>.
          </>
        )
      })}

      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  <strong>Para criar uma base:</strong> Clique em{' '}
                  <strong>&quot;Nova base&quot;</strong>, escolha um nome e
                  envie os documentos que deseja usar. Pronto! Sua base estará
                  disponível para consultas e integrações assim que terminar de
                  ser criada.
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Para editar:</strong> Selecione uma base existente na
                  lista para ver detalhes, adicionar ou remover documentos, ou
                  atualizar informações.
                </>
              )
            })}
            {li({
              children: (
                <>
                  <strong>Para excluir:</strong> Escolha a base desejada e
                  clique em <strong>&quot;Excluir&quot;</strong>. Confirme a
                  ação para remover a base do sistema.
                </>
              )
            })}
          </>
        )
      })}
    </motion.div>
  )
}

export default KnowledgeBasesPage
