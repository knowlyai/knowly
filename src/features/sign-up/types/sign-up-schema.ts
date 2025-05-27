import { STATE } from '@/shared/enums/states'
import { z } from 'zod'
import { differenceInYears } from 'date-fns'

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'O nome deve ter pelo menos 4 caracteres.' })
      .max(50, { message: 'O nome deve ter no máximo 50 caracteres.' }),
    username: z
      .string()
      .min(3, {
        message: 'O nome de usuário deve ter pelo menos 3 caracteres.'
      })
      .max(20, {
        message: 'O nome de usuário deve ter no máximo 20 caracteres.'
      }),
    email: z.string().email({ message: 'O e-mail deve ser válido.' }),
    phone: z
      .string()
      .min(11, { message: 'O telefone deve ter pelo menos 11 dígitos.' }),
    // Pessoa física ou jurídica
    type: z.enum(['individual', 'business'], {
      errorMap: () => ({ message: 'Selecione um tipo válido.' })
    }),
    // Se for pessoa jurídica, o CNPJ deve ser válido
    // Se for pessoa física, o CPF deve ser válido
    document: z.string(),
    state: z.string().refine((val) => Object.keys(STATE).includes(val), {
      message: 'Selecione um estado válido.'
    }),
    birthDate: z
      .date()
      // Deve ser maior de 18 anos
      .refine((date) => !isNaN(date.getTime()), {
        message: 'A data de nascimento deve ser válida.'
      })
      .refine(
        (date) => {
          const age = differenceInYears(Date.now(), date)
          return age >= 18
        },
        {
          message: 'Você deve ter pelo menos 18 anos.'
        }
      )
      .optional(),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
      .max(20, { message: 'A senha deve ter no máximo 20 caracteres.' }),
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

export type SignUpFormData = z.infer<typeof signUpFormSchema>
export const signUpFormInitialValues: SignUpFormData = {
  name: '',
  username: '',
  email: '',
  phone: '',
  state: '',
  type: 'individual',
  document: '',
  birthDate: undefined,
  password: '',
  confirmPassword: ''
}
