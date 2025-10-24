import { useMutation } from '@tanstack/react-query'
import {
  ChatWithKnowledgeBaseRequest,
  knowledgeBaseService
} from '@/services/knowledge-base'

export const useChatWithKnowledgeBaseMutation = () => {
  return useMutation({
    mutationFn: async (data: ChatWithKnowledgeBaseRequest) => {
      return await knowledgeBaseService.chatWithKnowledgeBase(data)
    }
  })
}
