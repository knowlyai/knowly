import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { useState } from 'react'

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
const variants = {
  hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
  visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 }
}

export function ForgotPasswordPage() {
  const EMAIL_ERROR_MESSAGE = 'Digite um e-mail válido'
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const validateEmail = (value: string) => {
    return /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/.test(
      value
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError(EMAIL_ERROR_MESSAGE)
      setSuccessMessage('')
      return
    }
    setEmailError('')
    // Aqui você pode adicionar a lógica de envio de e-mail de recuperação
    setSuccessMessage(
      'Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.'
    )
  }

  return (
    <Background className="to-background/90 from-background relative isolate flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b">
      <Layout className="flex min-h-screen flex-col items-center justify-center">
        <motion.section
          className="bg-background/80 flex w-full max-w-md flex-col items-center justify-center gap-8 rounded-xl p-8 shadow-lg"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.04 }}
        >
          <motion.h1
            className="text-center text-3xl font-semibold tracking-tight drop-shadow-xl"
            transition={transition}
            variants={variants}
          >
            Esqueci minha senha
          </motion.h1>
          <motion.form
            className="flex w-full flex-col gap-4"
            onSubmit={handleSubmit}
            transition={transition}
            variants={variants}
            noValidate
          >
            {successMessage && (
              <div className="mb-2 w-full rounded px-4 py-2 text-center font-semibold text-green-600">
                {successMessage}
              </div>
            )}
            <div>
              <input
                type="email"
                placeholder="Digite o e-mail cadastrado"
                className={`w-full rounded-md border px-4 py-2 ${emailError ? 'border-red-500' : ''}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError && validateEmail(e.target.value))
                    setEmailError('')
                }}
                onBlur={(e) => {
                  if (!validateEmail(e.target.value)) {
                    setEmailError(EMAIL_ERROR_MESSAGE)
                  } else {
                    setEmailError('')
                  }
                }}
                required
              />
              {emailError && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {emailError}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Enviar instruções
            </Button>
            <div className="text-foreground/70 mt-2 text-center text-sm">
              Lembrou sua senha?{' '}
              <a
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Voltar para login
              </a>
            </div>
          </motion.form>
        </motion.section>
      </Layout>
    </Background>
  )
}
