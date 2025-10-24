import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { Button } from '@/shared/components/button'
import { Input } from '@/shared/components/input'
import { Textarea } from '@/shared/components/textarea'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/card'
import { FileUpload } from '@/shared/components/file-upload'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/form'
import {
  createBaseSchema,
  CreateBaseData,
  createBaseInitialValues
} from '../types/create-base-schema'

export function CreateBase() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateBaseData>({
    resolver: zodResolver(createBaseSchema),
    defaultValues: createBaseInitialValues,
    mode: 'onBlur'
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 MB'
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(2)} MB`
  }

  const totalSize = form
    .watch('files')
    .reduce((acc, file) => acc + file.size, 0)

  const onSubmit = async (data: CreateBaseData) => {
    setIsSubmitting(true)

    try {
      // Slugify the name
      const slug = data.name
        .toLowerCase()
        .trim()
        .normalize('NFD') // Translate special to normal characters, like ç to c, ã to a, etc.
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9\s]/g, '-')
        .replace(/\s+/g, '-')
      data.slug = slug.concat('-', uuidv4().slice(0, 8)) // Append random string to ensure uniqueness
      // Navigate to pipeline page with form data
      navigate('/bases/create/pipeline', { state: { formData: data } })
    } catch (error) {
      toast.error('Erro ao processar dados')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Background className="justify-start">
      <Layout className="h-full w-full pt-28">
        <main className="flex flex-col p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-4xl"
          >
            {/* Header */}
            <div className="mb-8">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/bases')}
                className="mb-4 px-0 hover:bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para minhas bases
              </Button>

              <h1 className="text-foreground mb-2 text-3xl font-bold">
                Criar Nova Base de Conhecimento
              </h1>
              <p className="text-muted-foreground">
                Preencha as informações abaixo para criar sua base de
                conhecimento
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações Básicas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Base</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex: Base Jurídica, Documentação Técnica..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Descreva o conteúdo e objetivo desta base de conhecimento..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* File Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumo dos Arquivos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                          <div className="text-primary text-2xl font-bold">
                            {form.watch('files').length}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            Arquivo{form.watch('files').length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                          <div className="text-primary text-2xl font-bold">
                            {formatFileSize(totalSize)}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            Tamanho Total
                          </div>
                        </div>
                      </div>

                      {form.watch('files').length > 0 && (
                        <div className="pt-2">
                          <h4 className="mb-2 text-sm font-medium">
                            Arquivos selecionados:
                          </h4>
                          <div className="max-h-32 space-y-1 overflow-y-auto">
                            {form.watch('files').map((file, index) => (
                              <div
                                key={`${file.name}-${index}`}
                                className="flex items-center justify-between py-1 text-xs"
                              >
                                <span className="mr-2 flex-1 truncate">
                                  {file.name}
                                </span>
                                <span className="text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* File Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upload de Arquivos PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="files"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FileUpload
                              files={field.value}
                              onFilesChange={field.onChange}
                              accept=".pdf"
                              maxFiles={20}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/bases')}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Criando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Criar Base
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </main>
      </Layout>
    </Background>
  )
}
