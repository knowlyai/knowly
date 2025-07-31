import { useEffect, useState } from 'react'
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
import { useCreateKnowledgeBaseMutation } from './hooks/use-kb'
import { knowledgeBaseService } from '@/services/knowledge-base'
import { bucketName } from '@/shared/enviroment'

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

  const [pipeline, setPipeline] = useState<PipelineState>({
    currentStep: 0,
    steps: [
      {
        id: 'create-kb',
        title: 'Criar Base de Conhecimento',
        description: 'Criando a estrutura da base de conhecimento',
        icon: <FileText className="h-5 w-5" />,
        status: 'pending'
      },
      {
        id: 'upload-files',
        title: 'Upload de Arquivos',
        description: 'Enviando arquivos para o servidor',
        icon: <Upload className="h-5 w-5" />,
        status: 'pending'
      },
      {
        id: 'sync-kb',
        title: 'Sincronizar Base',
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

      console.log('Uploading to:', presignedUrl)
      console.log('Fields:', fields)

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

      console.log('Upload successful for:', file.name)
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
      // Step 1: Create Knowledge Base
      updateStepStatus(0, 'loading')
      const createResult = await createKnowledgeBaseMutation.mutateAsync({
        name: formData.name,
        description: formData.description
      })

      console.log('Knowledge Base created:', createResult)

      setPipeline((prev) => ({ ...prev, kbId: createResult.kb_id }))
      updateStepStatus(0, 'success')
      moveToNextStep()

      // Step 2: Upload Files
      updateStepStatus(1, 'loading')

      const presignedResponse = await knowledgeBaseService.getUrlPresigned({
        bucketName,
        kbId: createResult.kb_id
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

      // Step 3: Sync Knowledge Base
      updateStepStatus(2, 'loading')
      await knowledgeBaseService.syncKnowledgeBase({
        bucketName,
        kbId: createResult.kb_id
      })

      updateStepStatus(2, 'success')

      // Success!
      toast.success('Base de conhecimento criada com sucesso!')

      // Navigate to bases list after a short delay
      setTimeout(() => {
        navigate('/bases')
      }, 5000)
    } catch (error) {
      console.error('Pipeline error:', error)
      const currentStepIndex = pipeline.currentStep
      updateStepStatus(
        currentStepIndex,
        'error',
        'Erro inesperado durante o processo'
      )
      toast.error('Erro ao criar base de conhecimento')
    }
  }

  useEffect(() => {
    if (formData) {
      executeSteps()
    } else {
      navigate('/bases/create')
    }
  }, [])

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
        return 'bg-blue-100 border-blue-200 dark:bg-blue-950 dark:border-blue-800'
      case 'success':
        return 'bg-green-100 border-green-200 dark:bg-green-950 dark:border-green-800'
      case 'error':
        return 'bg-red-100 border-red-200 dark:bg-red-950 dark:border-red-800'
      default:
        return 'bg-muted border-border'
    }
  }

  if (!formData) {
    return null
  }

  return (
    <Background className="justify-start">
      <Layout className="h-full w-full pt-28">
        <main className="flex flex-col p-6 md:p-12">
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
                Criando Base de Conhecimento
              </h1>
              <p className="text-muted-foreground">
                Acompanhe o progresso da criação da sua base &quot;
                {formData.name}&quot;
              </p>
            </div>

            {/* Pipeline Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Progresso da Criação</CardTitle>
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
                            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
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
                >
                  Voltar ao Formulário
                </Button>
                <Button onClick={executeSteps}>Tentar Novamente</Button>
              </div>
            )}

            {pipeline.steps.every((s) => s.status === 'success') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 text-center"
              >
                <div className="mb-4 text-green-500">
                  <Check className="mx-auto h-16 w-16" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-green-600">
                  Base Criada com Sucesso!
                </h2>
                <p className="mb-4 text-gray-600">
                  Redirecionando para suas bases de conhecimento...
                </p>
              </motion.div>
            )}
          </motion.div>
        </main>
      </Layout>
    </Background>
  )
}
