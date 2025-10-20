import { KnowledgeBase } from '@/domain/knowledge-base'
import { api, getAuthHeader } from '@/shared/api'
import { MODELS } from '@/shared/enums/models'
import { STATUS } from '@/shared/enums/status'

export type CreateKnowledgeBaseRequest = {
  name: string
  displayName: string
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

export type DeleteFileRequest = {
  bucketName: string
  kbId: string
  fileName: string
}

export type GetKnowledgeBaseRequest = {
  kbId?: string
}

export type GetKnowledgeBaseResponse = {
  knowledge_bases: {
    kb_id: string
    name: string
    display_name: string
    description: string
    created_at: number // seconds since epoch
    updated_at: number // seconds since epoch
    status: string // should match STATUS type
    files: {
      filename: string
      size_bytes: number
      url: string
    }[]
    total_size_mb: number
    keys: {
      kb_key: string
      kb_key_alias: string
    }[]
  }[]
}

export type ChatWithKnowledgeBaseRequest = {
  kbId: string
  model: MODELS
  prompt: string
  topK?: number
}

export type ChatWithKnowledgeBaseResponse = {
  answer: string
}

export const knowledgeBaseService = {
  async getKnowledgeBase(
    request: GetKnowledgeBaseRequest
  ): Promise<KnowledgeBase[]> {
    // If kbId is not provided, fetch all knowledge bases
    const response = await api.get<GetKnowledgeBaseResponse>('/kb', {
      params: {
        kb_id: request.kbId
      },
      headers: getAuthHeader()
    })
    const data = response.data.knowledge_bases
    return data.map((kb) => {
      return {
        id: kb.kb_id,
        name: kb.name,
        displayName: kb.display_name,
        description: kb.description,
        createdAt: new Date(kb.created_at * 1000),
        updatedAt: new Date(kb.updated_at * 1000),
        status: kb.status as STATUS,
        files: kb.files.map((file) => ({
          fileName: file.filename,
          sizeMB: file.size_bytes / (1024 * 1024),
          url: file.url
        })),
        totalSizeMB: kb.total_size_mb,
        keys: kb.keys.map((key) => ({
          kbKey: key.kb_key,
          kbKeyAlias: key.kb_key_alias
        }))
      }
    })
  },

  async createKnowledgeBase(
    request: CreateKnowledgeBaseRequest
  ): Promise<CreateKnowledgeBaseResponse> {
    const response = await api.post<CreateKnowledgeBaseResponse>(
      '/kb',
      {
        kb_name: request.name,
        kb_display_name: request.displayName,
        kb_description: request.description
      },
      {
        headers: getAuthHeader()
      }
    )
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
          kb_id: request.kbId
        },
        headers: getAuthHeader()
      }
    )
    return response.data
  },

  async syncKnowledgeBase(request: SyncKnowledgeBaseRequest): Promise<void> {
    await api.get('/kb/sync', {
      params: {
        bucket_name: request.bucketName,
        kb_id: request.kbId
      },
      headers: getAuthHeader()
    })
  },

  async deleteFile(request: DeleteFileRequest): Promise<void> {
    await api.delete('/kb/file', {
      params: {
        bucket: request.bucketName,
        kb_id: request.kbId,
        file_name: request.fileName
      },
      headers: getAuthHeader()
    })
  },

  async chatWithKnowledgeBase(
    request: ChatWithKnowledgeBaseRequest
  ): Promise<ChatWithKnowledgeBaseResponse> {
    const response = await api.post<ChatWithKnowledgeBaseResponse>(
      '/chat',
      {
        kb_id: request.kbId,
        model: request.model,
        prompt: request.prompt,
        top_k: request.topK
      },
      {
        headers: getAuthHeader()
      }
    )
    return response.data
  }
}
