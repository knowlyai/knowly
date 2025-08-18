import {
  CreateKnowledgeBaseRequest,
  DeleteFileRequest,
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

export const useDeleteFileMutation = () => {
  return useMutation({
    mutationFn: async (data: DeleteFileRequest) => {
      return await knowledgeBaseService.deleteFile(data)
    }
  })
}

export const useGetKnowledgeBaseQuery = (kbId?: string) => {
  return useQuery({
    queryKey: ['knowledgeBases', kbId],
    queryFn: async () => {
      return await knowledgeBaseService.getKnowledgeBase({ kbId })
    }
  })
}
