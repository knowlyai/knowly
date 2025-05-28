import { ObjectValues } from '@/shared/enums/object-values'

export const DOCUMENT_TYPE = {
  INDIVIDUAL: 'individual',
  BUSINESS: 'business'
} as const

export type DOCUMENT_TYPE = ObjectValues<typeof DOCUMENT_TYPE>
