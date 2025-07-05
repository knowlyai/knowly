import { z } from 'zod'

export const faqFormSchema = z.object({
  nome: z.string().min(1, { message: 'O nome é obrigatório.' }),
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  assunto: z.string().min(1, { message: 'O assunto é obrigatório.' }),
  mensagem: z.string().min(1, { message: 'A mensagem é obrigatória.' })
})

export type FAQFormData = z.infer<typeof faqFormSchema>
export const faqFormInitialValues: FAQFormData = {
  nome: '',
  email: '',
  assunto: '',
  mensagem: ''
}
