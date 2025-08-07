import { STATUS } from '@/shared/enums/status'

export type KnowledgeBase = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  status: STATUS
  files: KnowledgeBaseFile[]
  totalSizeMB: number
}

export type KnowledgeBaseFile = {
  fileName: string
  sizeMB: number
  url: string
}
