import {
  CreateKnowledgeBaseRequest,
  knowledgeBaseService
} from '@/services/knowledge-base'
import { useMutation } from '@tanstack/react-query'

export const useCreateKnowledgeBaseMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateKnowledgeBaseRequest) => {
      return await knowledgeBaseService.createKnowledgeBase(data)
    }
  })
}
