import { ObjectValues } from '@/shared/enums/object-values'

export const MODELS = {
  MISTRAL_SMALL: 'mistral.mistral-small-2402-v1:0',
  AMAZON_NOVA_MICRO: 'amazon.nova-micro-v1:0'
} as const

export type MODELS = ObjectValues<typeof MODELS>
