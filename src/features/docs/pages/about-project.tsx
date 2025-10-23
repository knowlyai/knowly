import { motion } from 'framer-motion'
import { h1, h2, p } from '@/shared/components/typography'

export function AboutProjectPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {h1({ children: 'Sobre o Projeto' })}

      {h2({ children: 'Por que criamos o Knowly?' })}
      {p({
        children: (
          <>
            A inteligência artificial está mudando a forma como empresas
            trabalham, trazendo mais agilidade e eficiência para o dia a dia.
            Mas, para a maioria dos negócios, usar IA ainda é caro e complicado:
            exige conhecimento técnico, tempo e investimento alto em tecnologia.
          </>
        )
      })}
      {p({
        children: (
          <>
            O Knowly nasceu para simplificar esse cenário. Queremos que qualquer
            empresa consiga aproveitar o poder dos grandes modelos de linguagem
            para responder dúvidas, organizar informações e automatizar tarefas,
            sem precisar se preocupar com detalhes técnicos ou infraestrutura.
          </>
        )
      })}
      {p({
        children: (
          <>
            Nossa plataforma permite que você envie seus próprios documentos e,
            em poucos cliques, já tenha uma base de conhecimento inteligente
            pronta para ser usada no seu atendimento, site ou operação interna.
            Tudo isso com segurança, praticidade e custos acessíveis.
          </>
        )
      })}
      {p({
        children: (
          <>
            O objetivo é ajudar empresas a inovar, ganhar tempo e focar no que
            realmente importa: crescer e atender melhor seus clientes, usando IA
            de verdade no dia a dia.
          </>
        )
      })}
    </motion.div>
  )
}

export default AboutProjectPage
