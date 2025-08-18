import { ObjectValues } from '@/shared/enums/object-values'

export const STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DELETED: 'Deleted'
} as const

export type STATUS = ObjectValues<typeof STATUS>
