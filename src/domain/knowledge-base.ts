import { STATUS } from '@/shared/enums/status'

export type KnowledgeBase = {
  id: string
  name: string
  displayName: string
  description: string
  createdAt: Date
  updatedAt: Date
  status: STATUS
  files: KnowledgeBaseFile[]
  totalSizeMB: number
  keys: KnowledgeBaseKey[]
}

export type KnowledgeBaseFile = {
  fileName: string
  sizeMB: number
  url: string
}

export type KnowledgeBaseKey = {
  kbKey: string
  kbKeyAlias: string
}
