import { api } from '@/shared/api'

export type CreateUserRequest = {
  name: string
  email: string
  password: string
  cellphone: string
  personType: string
  cpfCnpj: string
  birthDate?: number // seconds since epoch (optional for business)
  plan: string
}

export type LoginUserRequest = {
  email: string
  password: string
}

export type LoginUserResponse = {
  id_token: string
  access_token: string
  refresh_token: string
}

export const userService = {
  async login(request: LoginUserRequest): Promise<LoginUserResponse> {
    const response = await api.post<LoginUserResponse>('/auth', {
      email: request.email,
      password: request.password
    })
    return response.data
  },

  async createUser(request: CreateUserRequest): Promise<void> {
    const payload: Record<string, unknown> = {
      name: request.name,
      email: request.email,
      password: request.password,
      cellphone: request.cellphone,
      p_type: request.personType,
      cpf_cnpj: request.cpfCnpj,
      address: 'Rua x, 123', // Placeholder address
      cep: '00000000', // Placeholder CEP
      plan: request.plan
    }

    if (typeof request.birthDate === 'number') {
      payload.birth_date = request.birthDate
    }

    await api.post('/user', payload)
  }
}
