import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/button'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  resetPasswordFormSchema,
  ResetPasswordFormData
} from '../types/reset-password-schema'

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
const variants = {
  hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
  visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 }
}

export function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema)
  })

  const onSubmit = (data: ResetPasswordFormData) => {
    setSuccessMessage('Senha redefinida com sucesso!')
    // Adicione aqui a lógica de redefinição de senha
    reset()
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
            Redefinir senha
          </motion.h1>
          <motion.form
            className="flex w-full flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            transition={transition}
            variants={variants}
            noValidate
          >
            {successMessage && (
              <div className="mb-2 w-full rounded px-4 py-2 text-center font-semibold text-green-600">
                {successMessage}
              </div>
            )}
            <div className="relative mb-2">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nova senha"
                className={`w-full rounded-md border px-4 py-2 ${errors.password ? 'border-red-500' : ''}`}
                {...register('password')}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 p-1"
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
            </div>
            <div className="relative mb-2">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirme a nova senha"
                className={`w-full rounded-md border px-4 py-2 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                {...register('confirmPassword')}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 p-1"
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
              {errors.confirmPassword && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Confirmar nova senha
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
