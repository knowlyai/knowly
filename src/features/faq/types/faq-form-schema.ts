import { z } from 'zod'

export const faqFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  subject: z.string().min(1, { message: 'O assunto é obrigatório.' }),
  message: z.string().min(1, { message: 'A mensagem é obrigatória.' })
})

export type FAQFormData = z.infer<typeof faqFormSchema>
export const faqFormInitialValues: FAQFormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
}
