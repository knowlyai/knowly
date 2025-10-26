import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Send, Bot, User, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { Button } from '@/shared/components/button'
import { Input } from '@/shared/components/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/select'
import { Badge } from '@/shared/components/badge'
import { MODELS } from '@/shared/enums/models'
import { useChatWithKnowledgeBaseMutation } from '@/features/playground/hooks/use-chat'
import { useGetKnowledgeBaseQuery } from '@/features/user-area/hooks/use-kb'
import { AxiosError } from 'axios'

type Message = {
  id: string
  content: string
  type: 'user' | 'bot'
  timestamp: Date
}

export function PlaygroundPage() {
  const { kbId } = useParams<{ kbId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const kbKey = location.state?.kbKey as string | undefined
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [selectedModel, setSelectedModel] = useState<MODELS>(
    MODELS.AMAZON_NOVA_MICRO
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { data: knowledgeBases } = useGetKnowledgeBaseQuery()
  const chatMutation = useChatWithKnowledgeBaseMutation()

  const currentKnowledgeBase = knowledgeBases?.find((kb) => kb.id === kbId)

  useEffect(() => {
    // Validate if kbKey is available
    if (!kbKey && currentKnowledgeBase) {
      const firstKey = currentKnowledgeBase.keys[0]?.kbKey
      if (!firstKey) {
        toast.error(
          'Nenhuma chave de API disponível para esta base de conhecimento'
        )
        navigate('/bases')
      }
    }
  }, [kbKey, currentKnowledgeBase, navigate])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !kbId) return

    // Get the kbKey to use (from state or from current KB)
    const keyToUse = kbKey || currentKnowledgeBase?.keys[0]?.kbKey

    if (!keyToUse) {
      toast.error('Chave de API não disponível')
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date()
    }

    const loadingMessage: Message = {
      id: 'loading',
      content: 'Pensando...',
      type: 'bot',
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInputValue('')

    try {
      const response = await chatMutation.mutateAsync({
        kbId,
        kbKey: keyToUse,
        model: selectedModel,
        prompt: inputValue
      })

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        type: 'bot',
        timestamp: new Date()
      }

      setMessages((prev) =>
        prev.filter((msg) => msg.id !== 'loading').concat(botMessage)
      )
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.')

      const message =
        (error as AxiosError<{ details: string }>).response?.data.details ??
        (error as Error).message ??
        ''

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente. ${message}`,
        type: 'bot',
        timestamp: new Date()
      }

      setMessages((prev) =>
        prev.filter((msg) => msg.id !== 'loading').concat(errorMessage)
      )
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Background className="h-screen justify-start">
      <Layout className="h-screen w-full pt-16">
        <main className="flex h-[calc(100vh-3rem)] flex-col p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex h-full max-h-full w-full flex-col sm:pl-24"
          >
            {/* Header */}
            <div className="mb-4 flex-shrink-0">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/bases')}
                className="mb-3 px-0 hover:bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para bases
              </Button>

              <h1 className="text-foreground mb-2 text-2xl font-bold">
                Playground
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-muted-foreground text-sm">
                  Testando:{' '}
                  {currentKnowledgeBase?.name || 'Base não encontrada'}
                </p>
                <Select
                  value={selectedModel}
                  onValueChange={(value: MODELS) => setSelectedModel(value)}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Selecione um modelo">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        {selectedModel === MODELS.MISTRAL_SMALL
                          ? 'Mistral Small'
                          : 'Amazon Nova Micro'}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={MODELS.MISTRAL_SMALL}>
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        Mistral Small
                      </div>
                    </SelectItem>
                    <SelectItem value={MODELS.AMAZON_NOVA_MICRO}>
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        Amazon Nova Micro
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Chat Container */}
            <Card className="flex min-h-0 max-w-2xl flex-1 flex-col overflow-hidden">
              <CardHeader className="flex-shrink-0 pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Chat com IA
                  <Badge variant="secondary" className="ml-auto">
                    {messages.filter((m) => m.type === 'user').length} mensagens
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex min-h-0 flex-1 flex-col p-4">
                {/* Messages Area */}
                <div className="mb-3 min-h-0 flex-1 space-y-3 overflow-y-auto">
                  {/* ...existing code... */}
                  {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                      <Bot className="text-muted-foreground mb-4 h-16 w-16" />
                      <h3 className="text-foreground mb-2 text-lg font-semibold">
                        Pronto para conversar!
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        Faça uma pergunta sobre o conteúdo da sua base de
                        conhecimento. A IA irá responder baseada nos documentos
                        que você enviou.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex gap-3 ${
                            message.type === 'user'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          {message.type === 'bot' && (
                            <div className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                              <Bot className="text-primary h-4 w-4" />
                            </div>
                          )}

                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.type === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            {message.id === 'loading' ? (
                              <div className="flex items-center gap-2 p-[6px]">
                                <div className="flex gap-1">
                                  <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
                                  <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
                                  <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
                                </div>
                                <span className="text-muted-foreground text-sm">
                                  {message.content}
                                </span>
                              </div>
                            ) : (
                              <>
                                <p className="p-[6px] text-sm whitespace-pre-wrap">
                                  {message.content}
                                </p>
                                <p className={`mt-1 text-xs opacity-70`}>
                                  {formatTime(message.timestamp)}
                                </p>
                              </>
                            )}
                          </div>

                          {message.type === 'user' && (
                            <div className="bg-muted flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                              <User className="text-foreground h-4 w-4" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="flex flex-shrink-0 gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua pergunta aqui..."
                    disabled={chatMutation.isPending}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || chatMutation.isPending}
                    className="flex items-center gap-2"
                  >
                    {chatMutation.isPending ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {chatMutation.isPending ? 'Enviando...' : 'Enviar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </Layout>
    </Background>
  )
}
