import { api } from '@/shared/api'

export type CreateKnowledgeBaseRequest = {
  name: string
  description: string
}

type CreateKnowledgeBaseResponse = {
  kb_id: string
}

export type GetUrlPresignedUrlRequest = {
  bucketName: string
  kbId: string
}

type GetUrlPresignedUrlResponse = {
  url: string
  fields: {
    key: string
    AWSAccessKeyId: string
    policy: string
    signature: string
  }
}

export type SyncKnowledgeBaseRequest = {
  bucketName: string
  kbId: string
}

export const knowledgeBaseService = {
  async createKnowledgeBase(
    request: CreateKnowledgeBaseRequest
  ): Promise<CreateKnowledgeBaseResponse> {
    const response = await api.post<CreateKnowledgeBaseResponse>('/kb', {
      kb_name: request.name,
      kb_description: request.description
    })
    return response.data
  },

  async getUrlPresigned(
    request: GetUrlPresignedUrlRequest
  ): Promise<GetUrlPresignedUrlResponse> {
    const response = await api.get<GetUrlPresignedUrlResponse>(
      '/kb/presigned-url',
      {
        params: {
          bucket: request.bucketName,
          user_id: 'a9de692c-0ee3-41c6-aecc-44e79b8d739e', // This should be replaced with the actual user ID from your authentication context
          kb_id: request.kbId
        }
      }
    )
    return response.data
  },

  async syncKnowledgeBase(request: SyncKnowledgeBaseRequest): Promise<void> {
    await api.get('/kb/sync', {
      params: {
        bucket_name: request.bucketName,
        user_id: 'a9de692c-0ee3-41c6-aecc-44e79b8d739e', // This should be replaced with the actual user ID from your authentication context
        kb_id: request.kbId
      }
    })
  }
}
