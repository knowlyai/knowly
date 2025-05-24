import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
const variants = {
  hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
  visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 }
}

export function LoginPage() {
  const EMAIL_ERROR_MESSAGE = 'Digite um e-mail válido'
  const LOGIN_ERROR_MESSAGE = 'Login ou senha inválidos'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')

  const validateEmail = (value: string) => {
    return /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/.test(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError(EMAIL_ERROR_MESSAGE)
      return
    }
    setEmailError('')
    setAuthError(LOGIN_ERROR_MESSAGE) // Simulação de erro de autenticação
    // Adicione aqui a lógica de autenticação
  }

  return (
    <Background className="to-background/90 from-background relative isolate flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b">
      <Layout className="flex min-h-screen flex-col items-center justify-center">
        <motion.section
          className="flex flex-col items-center justify-center gap-8 w-full max-w-md p-8 rounded-xl shadow-lg bg-background/80"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.04 }}
        >
          <motion.h1
            className="text-center text-4xl font-semibold tracking-tight drop-shadow-xl"
            transition={transition}
            variants={variants}
          >
            Seja bem-vindo!
          </motion.h1>
          <motion.form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit}
            transition={transition}
            variants={variants}
            noValidate
          >
            {authError && (
            <div className="w-full rounded text-red-600 px-4 py-2 text-center font-semibold">
              {authError}
            </div>
          )}
            <div>
            <input
              type="email"
              placeholder="E-mail"
              className={`rounded-md w-full border px-4 py-2 ${emailError ? 'border-red-500' : ''}`}
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                if (!validateEmail(e.target.value)) {
                  setEmailError(EMAIL_ERROR_MESSAGE)
                }
                else {
                  setEmailError('')
                }
              }}
              onBlur={e => {
                setEmail(e.target.value)
                if (!validateEmail(e.target.value)) {
                  setEmailError(EMAIL_ERROR_MESSAGE)
                }
                else {
                  setEmailError('')
                }
              }}
              required
            />
            {emailError && (
            <span className="text-red-600 text-xs block mt-1 font-semibold">
                {emailError}
            </span>
            )}
            </div>
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                className="rounded-md border px-4 py-2 w-full"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <a
                href="/forgot-password"
                className="absolute right-0 text-sm text-primary hover:underline"
                style={{ bottom: '-1.8rem' }}
              >
                Esqueci minha senha
              </a>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="text-center mt-2 text-sm text-foreground/70">
              Ainda não tem uma conta?{' '}
              <a href="/register" className="text-primary font-medium hover:underline">
                Cadastre-se aqui
              </a>
            </div>
          </motion.form>
        </motion.section>
      </Layout>
    </Background>
  )
}