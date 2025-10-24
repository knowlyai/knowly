import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  Loader2,
  ArrowLeft,
  FileText,
  Upload,
  RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'

import { Button } from '@/shared/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/card'
import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { CreateBaseData } from '../types/create-base-schema'
import { useCreateKnowledgeBaseMutation } from '../hooks/use-kb'
import { knowledgeBaseService } from '@/services/knowledge-base'
import { bucketName } from '@/shared/enviroment'
import { AxiosError } from 'axios'

type PipelineStep = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: 'pending' | 'loading' | 'success' | 'error'
  errorMessage?: string
}

type PipelineState = {
  currentStep: number
  kbId?: string
  steps: PipelineStep[]
}

export function CreateBasePipeline() {
  const navigate = useNavigate()
  const location = useLocation()
  const formData = location.state?.formData as CreateBaseData

  const createKnowledgeBaseMutation = useCreateKnowledgeBaseMutation()

  // Guard to prevent double-run under React StrictMode in development
  const didRunRef = useRef(false)

  const [pipeline, setPipeline] = useState<PipelineState>({
    currentStep: 0,
    steps: [
      {
        id: 'create-kb',
        title: 'Criar base de conhecimento',
        description: 'Criando a estrutura da base de conhecimento',
        icon: <FileText className="h-5 w-5" />,
        status: 'pending'
      },
      {
        id: 'upload-files',
        title: 'Upload de arquivos',
        description: 'Enviando arquivos para o servidor',
        icon: <Upload className="h-5 w-5" />,
        status: 'pending'
      },
      {
        id: 'sync-kb',
        title: 'Sincronizar base',
        description: 'Processando e indexando conteúdo',
        icon: <RefreshCw className="h-5 w-5" />,
        status: 'pending'
      }
    ]
  })

  const updateStepStatus = (
    stepIndex: number,
    status: PipelineStep['status'],
    errorMessage?: string
  ) => {
    setPipeline((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) =>
        index === stepIndex ? { ...step, status, errorMessage } : step
      )
    }))
  }

  const moveToNextStep = () => {
    setPipeline((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.steps.length - 1)
    }))
  }

  const uploadFileToS3 = async (
    file: File,
    presignedUrl: string,
    fields: Record<string, string>
  ) => {
    try {
      const formData = new FormData()

      // Add all fields from presigned URL in the correct order
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value)
      })

      // Add the file last
      formData.append('file', file)

      const response = await fetch(presignedUrl, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(
          'Upload failed:',
          response.status,
          response.statusText,
          errorText
        )
        throw new Error(
          `Failed to upload ${file.name}: ${response.status} ${response.statusText}`
        )
      }
    } catch (error) {
      console.error('Upload error for file:', file.name, error)
      throw error
    }
  }

  const executeSteps = async () => {
    if (!formData) {
      toast.error('Dados do formulário não encontrados')
      navigate('/bases/create')
      return
    }

    try {
      let kbId = pipeline.kbId

      // Step 1: Create Knowledge Base (skip if already created)
      if (pipeline.steps[0].status !== 'success') {
        updateStepStatus(0, 'loading')
        const createResult = await createKnowledgeBaseMutation.mutateAsync({
          name: formData.slug,
          displayName: formData.name,
          description: formData.description
        })

        kbId = createResult.kb_id
        setPipeline((prev) => ({ ...prev, kbId }))
        updateStepStatus(0, 'success')
        moveToNextStep()
      } else {
        // Already succeeded, just move forward
        console.log('Step 1 já concluído, pulando...')
        setPipeline((prev) => ({
          ...prev,
          currentStep: Math.max(prev.currentStep, 1)
        }))
      }

      if (!kbId) {
        throw new Error('KB ID não encontrado')
      }

      // Step 2: Upload Files (skip if already uploaded)
      if (pipeline.steps[1].status !== 'success') {
        updateStepStatus(1, 'loading')

        const presignedResponse = await knowledgeBaseService.getUrlPresigned({
          bucketName,
          kbId
        })

        for (let i = 0; i < formData.files.length; i++) {
          const file = formData.files[i]

          try {
            // Upload file to S3
            await uploadFileToS3(
              file,
              presignedResponse.url,
              presignedResponse.fields
            )

            // Update description to show progress
            setPipeline((prev) => ({
              ...prev,
              steps: prev.steps.map((step, index) =>
                index === 1
                  ? {
                      ...step,
                      description: `Enviando arquivo ${i + 1} de ${
                        formData.files.length
                      }: ${file.name}`
                    }
                  : step
              )
            }))
          } catch (error) {
            console.error(`Error uploading file ${file.name}:`, error)
            updateStepStatus(1, 'error', `Erro ao enviar arquivo: ${file.name}`)
            return
          }
        }

        updateStepStatus(1, 'success')
        setPipeline((prev) => ({
          ...prev,
          steps: prev.steps.map((step, index) =>
            index === 1
              ? {
                  ...step,
                  description: `${formData.files.length} arquivos enviados com sucesso`
                }
              : step
          )
        }))
        moveToNextStep()
      } else {
        // Already succeeded, just move forward
        console.log('Step 2 já concluído, pulando...')
        setPipeline((prev) => ({
          ...prev,
          currentStep: Math.max(prev.currentStep, 2)
        }))
      }

      // Step 3: Sync Knowledge Base (skip if already synced)
      if (pipeline.steps[2].status !== 'success') {
        updateStepStatus(2, 'loading')
        await new Promise((resolve) => setTimeout(resolve, 5000)) // Sleep
        await knowledgeBaseService.syncKnowledgeBase({
          bucketName,
          kbId
        })

        updateStepStatus(2, 'success')
      }

      // Success!
      toast.success('Base de conhecimento criada com sucesso!')

      // Navigate to bases list after a short delay
      setTimeout(() => {
        navigate('/bases')
      }, 5000)
    } catch (error) {
      const currentStepIndex = pipeline.currentStep
      updateStepStatus(
        currentStepIndex,
        'error',
        'Erro inesperado durante o processo'
      )
      toast.error(
        'Erro ao criar base de conhecimento: ' +
          (error as AxiosError<{ details: string }>).response?.data?.details ||
          (error as Error).message
      )
    }
  }

  useEffect(() => {
    if (didRunRef.current) return
    didRunRef.current = true

    if (formData) {
      executeSteps()
    } else {
      navigate('/bases/create')
    }
  }, [])

  const handleRetry = () => {
    // Reset error states but keep success states
    setPipeline((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.status === 'error'
          ? { ...step, status: 'pending', errorMessage: undefined }
          : step
      )
    }))

    // Show info about resuming
    const successCount = pipeline.steps.filter(
      (s) => s.status === 'success'
    ).length
    if (successCount > 0) {
      toast.success(
        `Retomando do ponto de falha. ${successCount} etapa(s) já concluída(s) serão puladas.`
      )
    }

    // Execute steps again (will skip already successful steps)
    executeSteps()
  }

  const getStepIcon = (step: PipelineStep) => {
    switch (step.status) {
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin" />
      case 'success':
        return <Check className="h-5 w-5" />
      case 'error':
        return <X className="h-5 w-5" />
      default:
        return step.icon
    }
  }

  const getStepColor = (step: PipelineStep) => {
    switch (step.status) {
      case 'loading':
        return 'text-blue-500'
      case 'success':
        return 'text-green-500'
      case 'error':
        return 'text-red-500'
      default:
        return 'text-foreground/60'
    }
  }

  const getStepBackground = (step: PipelineStep) => {
    switch (step.status) {
      case 'loading':
        return 'bg-primary/10 border-primary/20'
      case 'success':
        return 'bg-lime-50/30 border-green-200'
      case 'error':
        return 'bg-red-100 border-red-200'
      default:
        return 'bg-card border-border'
    }
  }

  if (!formData) {
    return null
  }

  return (
    <Background className="justify-start">
      <Layout className="h-full w-full pt-28">
        <main className="flex flex-col p-6 pb-24 md:p-12 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-2xl"
          >
            {/* Header */}
            <div className="mb-8">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/bases/create')}
                className="mb-4 px-0 hover:bg-transparent"
                disabled={pipeline.steps.some((s) => s.status === 'loading')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>

              <h1 className="text-foreground mb-2 text-3xl font-bold">
                Criando base de conhecimento
              </h1>
              <p className="text-muted-foreground">
                Acompanhe o progresso da criação da sua base &quot;
                {formData.name}&quot;
              </p>
            </div>

            {/* Pipeline Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Progresso da criação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {pipeline.steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`relative flex items-start space-x-4 rounded-lg border p-4 transition-all ${getStepBackground(
                      step
                    )}`}
                  >
                    {/* Step Number/Icon */}
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        step.status === 'loading'
                          ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
                          : step.status === 'success'
                            ? 'border-green-200 bg-lime-100/90'
                            : step.status === 'error'
                              ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                              : 'border-border/50 bg-background'
                      }`}
                    >
                      <span className={getStepColor(step)}>
                        {getStepIcon(step)}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className={`font-semibold ${getStepColor(step)}`}>
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          step.status === 'error'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-foreground/70'
                        }`}
                      >
                        {step.status === 'error' && step.errorMessage
                          ? step.errorMessage
                          : step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {pipeline.steps.some((s) => s.status === 'error') && (
              <div className="mt-6 flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/bases/create')}
                  disabled={pipeline.steps.some((s) => s.status === 'loading')}
                >
                  Voltar ao Formulário
                </Button>
                <Button
                  onClick={handleRetry}
                  disabled={pipeline.steps.some((s) => s.status === 'loading')}
                >
                  Tentar Novamente
                </Button>
              </div>
            )}
          </motion.div>
        </main>
      </Layout>
    </Background>
  )
}
