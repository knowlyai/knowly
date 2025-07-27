import { z } from 'zod'
import { differenceInYears } from 'date-fns'
import { DOCUMENT_TYPE } from '@/shared/enums/document-type'

export const userInfoSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'O nome deve ter pelo menos 4 caracteres.' })
      .max(50, { message: 'O nome deve ter no máximo 50 caracteres.' }),
    email: z.string().email({ message: 'O e-mail deve ser válido.' }),
    phone: z
      .string()
      .min(11, { message: 'O telefone deve ter pelo menos 11 dígitos.' }),
    documentType: z
      .string()
      .refine(
        (val) => Object.values(DOCUMENT_TYPE).includes(val as DOCUMENT_TYPE),
        {
          message: 'Selecione um tipo de pessoa válido.'
        }
      ),
    document: z.string().min(1, { message: 'O documento é obrigatório.' }),
    birthDate: z
      .date()
      .refine((date) => !isNaN(date.getTime()), {
        message: 'A data de nascimento deve ser válida.'
      })
      .refine(
        (date) => {
          const age = differenceInYears(new Date(), date)
          return age >= 18
        },
        {
          message: 'Você deve ter pelo menos 18 anos.'
        }
      )
      .optional()
  })
  .superRefine((data, ctx) => {
    if (data.documentType === 'individual' && !data.birthDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A data de nascimento é obrigatória para pessoa física.',
        path: ['birthDate']
      })
    }

    if (data.documentType === 'individual') {
      // Validação CPF
      const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
      if (!cpfRegex.test(data.document)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CPF inválido. Use o formato: 000.000.000-00',
          path: ['document']
        })
      }
    } else if (data.documentType === 'business') {
      // Validação CNPJ
      const cnpjRegex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/
      if (!cnpjRegex.test(data.document)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CNPJ inválido. Use o formato: 00.000.000/0000-00',
          path: ['document']
        })
      }
    }
  })

export type UserInfoData = z.infer<typeof userInfoSchema>
