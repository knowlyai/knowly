import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'O e-mail deve ser válido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' })
})

export type LoginFormData = z.infer<typeof loginFormSchema>
export const loginFormInitialValues: LoginFormData = {
  email: '',
  password: ''
}
