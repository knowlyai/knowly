import { motion } from 'framer-motion'
import { h1, h2, p, ul, li } from '@/shared/components/typography'

export function SubscriptionManagementPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {h1({ children: 'Gerenciando seu Plano de Assinatura' })}

      {h2({ children: 'Como alterar seu plano' })}
      {p({
        children: (
          <>
            Para gerenciar seu plano de assinatura no Knowly, é só acessar a
            área do usuário após fazer login. No menu lateral à esquerda, clique
            em <strong>&quot;Assinatura&quot;</strong>.
          </>
        )
      })}
      {ul({
        children: (
          <>
            {li({
              children: (
                <>
                  Na seção <strong>&quot;Plano atual&quot;</strong>, procure o
                  botão <strong>&quot;Mudar plano&quot;</strong> no canto
                  inferior direito.
                </>
              )
            })}
            {li({
              children: (
                <>
                  Clique em <strong>&quot;Mudar plano&quot;</strong> para ver as
                  opções disponíveis e escolher o plano que melhor atende às
                  suas necessidades.
                </>
              )
            })}
            {li({
              children: (
                <>
                  Confirme a alteração e pronto! Seu novo plano já estará ativo.
                </>
              )
            })}
          </>
        )
      })}
      {p({
        children: (
          <>
            Assim, você pode ajustar sua assinatura sempre que quiser, de forma
            rápida e sem complicação.
          </>
        )
      })}
    </motion.div>
  )
}

export default SubscriptionManagementPage
