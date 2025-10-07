import { api, getAuthHeader } from '@/shared/api'
import { User } from '@/shared/domain/user'

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

export type UpdateUserRequest = {
  name?: string
  cellphone?: string
  plan?: string
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

export type UserResponse = {
  user: {
    user_id: string
    name: string
    email: string
    cellphone: string
    p_type: string
    cpf_cnpj: string
    address: string
    cep: string
    birthdate: number | null
    plan: string
    creation_date: number
    update_date: number
  }
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
  },

  async updateUser(request: UpdateUserRequest): Promise<void> {
    const payload = {
      new_name: request.name,
      new_cellphone: request.cellphone,
      new_plan: request.plan
    }

    await api.patch('/user', payload, {
      headers: getAuthHeader()
    })
  },

  async getUser(): Promise<User> {
    const response = await api.get<UserResponse>('/user', {
      headers: getAuthHeader()
    })
    const data = response.data.user
    console.log('User data fetched:', data)
    return {
      id: data.user_id,
      name: data.name,
      email: data.email,
      cellphone: data.cellphone,
      personType: data.p_type,
      cpfCnpj: data.cpf_cnpj,
      address: data.address,
      cep: data.cep,
      birthDate: data.birthdate ? new Date(data.birthdate * 1000) : undefined,
      plan: data.plan,
      creationDate: data.creation_date,
      updateDate: data.update_date
    }
  }
}
