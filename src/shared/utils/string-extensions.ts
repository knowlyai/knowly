export const formatCPF = (value: string) => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '')

  // Aplica a máscara conforme o usuário digita
  if (cleanValue.length <= 3) {
    return cleanValue
  } else if (cleanValue.length <= 6) {
    return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3)}`
  } else if (cleanValue.length <= 9) {
    return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3, 6)}.${cleanValue.slice(6)}`
  } else {
    return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3, 6)}.${cleanValue.slice(6, 9)}-${cleanValue.slice(9, 11)}`
  }
}

export const formatCNPJ = (value: string) => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '')

  // Aplica a máscara conforme o usuário digita
  if (cleanValue.length <= 2) {
    return cleanValue
  } else if (cleanValue.length <= 5) {
    return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2)}`
  } else if (cleanValue.length <= 8) {
    return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5)}`
  } else if (cleanValue.length <= 12) {
    return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5, 8)}/${cleanValue.slice(8)}`
  } else {
    return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5, 8)}/${cleanValue.slice(8, 12)}-${cleanValue.slice(12, 14)}`
  }
}

export const formatPhone = (value: string) => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '')

  // Aplica a máscara conforme o usuário digita
  if (cleanValue.length <= 2) {
    return cleanValue
  } else if (cleanValue.length <= 6) {
    return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`
  } else if (cleanValue.length <= 10) {
    // Para telefone fixo (8 dígitos): (11) 5320-2121
    return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 6)}-${cleanValue.slice(6)}`
  } else {
    // Para celular (9 dígitos): (11) 95320-2121
    return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 7)}-${cleanValue.slice(7, 11)}`
  }
}

export const handleCPFChange = (
  value: string,
  onChange: (value: string) => void
) => {
  const formattedValue = formatCPF(value)
  onChange(formattedValue)
}

export const handleCNPJChange = (
  value: string,
  onChange: (value: string) => void
) => {
  const formattedValue = formatCNPJ(value)
  onChange(formattedValue)
}

export const handlePhoneChange = (
  value: string,
  onChange: (value: string) => void
) => {
  const formattedValue = formatPhone(value)
  onChange(formattedValue)
}
