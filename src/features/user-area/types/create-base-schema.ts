import { z } from 'zod'

export const createBaseSchema = z.object({
  name: z.string().min(1, { message: 'O nome da base é obrigatório.' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória.' }),
  files: z
    .array(z.instanceof(File))
    .min(1, { message: 'Pelo menos um arquivo PDF é obrigatório.' })
})

export type CreateBaseData = z.infer<typeof createBaseSchema>

export const createBaseInitialValues: CreateBaseData = {
  name: '',
  description: '',
  files: []
}
