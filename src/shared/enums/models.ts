import { ObjectValues } from '@/shared/enums/object-values'

export const MODELS = {
  MISTRAL_SMALL: 'MISTRAL_SMALL',
  AMAZON_NOVA_MICRO: 'AMAZON_NOVA_MICRO'
} as const

export type MODELS = ObjectValues<typeof MODELS>
