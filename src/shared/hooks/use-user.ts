import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
  userService
} from '@/services/user'
import { UserContext } from '@/shared/contexts/user-context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

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

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return await userService.getUser()
    }
  })
}

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: async (request: UpdateUserRequest) => {
      return await userService.updateUser(request)
    }
  })
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
