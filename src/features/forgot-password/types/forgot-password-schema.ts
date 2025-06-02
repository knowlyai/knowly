import { z } from 'zod'

export const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: 'O e-mail deve ser válido.' })
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>
export const forgotPasswordFormInitialValues: ForgotPasswordFormData = {
  email: ''
}
