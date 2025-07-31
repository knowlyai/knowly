import {
  CreateKnowledgeBaseRequest,
  knowledgeBaseService
} from '@/services/knowledge-base'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreateKnowledgeBaseMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateKnowledgeBaseRequest) => {
      return await knowledgeBaseService.createKnowledgeBase(data)
    }
  })
}

export const usePresignedUrlQuery = (bucketName: string, kbId: string) => {
  return useQuery({
    queryKey: ['getPresignedUrl', bucketName, kbId],
    queryFn: async () => {
      return await knowledgeBaseService.getUrlPresigned({
        bucketName,
        kbId
      })
    },
    enabled: !!bucketName && !!kbId
  })
}

export const useSyncKnowledgeBaseQuery = (bucketName: string, kbId: string) => {
  return useQuery({
    queryKey: ['syncKnowledgeBase', bucketName, kbId],
    queryFn: async () => {
      return await knowledgeBaseService.syncKnowledgeBase({
        bucketName,
        kbId
      })
    },
    enabled: !!bucketName && !!kbId
  })
}
