import {
  CreateUserRequest,
  LoginUserRequest,
  userService
} from '@/services/user'
import { useMutation } from '@tanstack/react-query'

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: async (request: CreateUserRequest) => {
      return await userService.createUser(request)
    }
  })
}

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: async (request: LoginUserRequest) => {
      return await userService.login(request)
    }
  })
}
