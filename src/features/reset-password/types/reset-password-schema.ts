import { z } from 'zod'

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
      .refine((password) => /[a-z]/.test(password), {
        message: 'A senha deve conter pelo menos uma letra minúscula.'
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: 'A senha deve conter pelo menos uma letra maiúscula.'
      })
      .refine((password) => /\d/.test(password), {
        message: 'A senha deve conter pelo menos um número.'
      })
      .refine(
        (password) => /[@!#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
        {
          message:
            'A senha deve conter pelo menos um símbolo (@, !, #, $, %, etc.).'
        }
      ),
    confirmPassword: z.string()
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não conferem.',
        path: ['confirmPassword']
      })
    }
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>
export const resetPasswordFormInitialValues: ResetPasswordFormData = {
  password: '',
  confirmPassword: ''
}
