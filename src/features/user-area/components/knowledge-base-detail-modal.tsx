import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  FileText,
  Trash2,
  Plus,
  Play,
  Eye,
  EyeOff,
  Copy,
  Check
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/components/dialog'
import { Button } from '@/shared/components/button'
import { Badge } from '@/shared/components/badge'
import { Separator } from '@/shared/components/separator'
import { KnowledgeBase } from '@/domain/knowledge-base'

interface KnowledgeBaseDetailModalProps {
  knowledgeBase: KnowledgeBase
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function KnowledgeBaseDetailModal({
  knowledgeBase,
  open,
  onOpenChange
}: KnowledgeBaseDetailModalProps) {
  const navigate = useNavigate()
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copiedKeys, setCopiedKeys] = useState<Set<string>>(new Set())

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) {
      return `${Math.round(sizeInMB * 1024)} KB`
    }
    return `${sizeInMB.toFixed(1)} MB`
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-600'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const handleRemoveFile = (fileName: string) => {
    // TODO: Implementar lógica de remoção de arquivo
    console.log('Removendo arquivo:', fileName)
  }

  const handleAddFiles = () => {
    // TODO: Implementar lógica de adição de arquivos
    console.log('Adicionando mais arquivos')
  }

  const handleTestKnowledgeBase = () => {
    // Get the first available key
    const firstKey = knowledgeBase.keys[0]?.kbKey

    navigate(`/playground/${knowledgeBase.id}`, {
      state: { kbKey: firstKey }
    })
    onOpenChange(false)
  }

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(keyId)) {
        newSet.delete(keyId)
      } else {
        newSet.add(keyId)
      }
      return newSet
    })
  }

  const copyKeyToClipboard = async (key: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(key)
      setCopiedKeys((prev) => new Set(prev).add(keyId))
      setTimeout(() => {
        setCopiedKeys((prev) => {
          const newSet = new Set(prev)
          newSet.delete(keyId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Erro ao copiar chave:', err)
    }
  }

  const maskKey = (key: string) => {
    return '•'.repeat(key.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {knowledgeBase.displayName}
            <Badge className={getStatusColor(knowledgeBase.status)}>
              {knowledgeBase.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>{knowledgeBase.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações gerais */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground font-medium">
                Criada em:
              </span>
              <p>{knowledgeBase.createdAt.toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <span className="text-muted-foreground font-medium">
                Última modificação:
              </span>
              <p>{knowledgeBase.updatedAt.toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <span className="text-muted-foreground font-medium">
                Total de arquivos:
              </span>
              <p>
                {knowledgeBase.files.length} arquivo
                {knowledgeBase.files.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground font-medium">
                Tamanho total:
              </span>
              <p>{knowledgeBase.totalSizeMB.toFixed(1)} MB</p>
            </div>
          </div>

          <Separator />

          {/* API Keys */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">API Keys</h3>
            {knowledgeBase.keys.length === 0 ? (
              <div className="text-muted-foreground py-4 text-center text-sm">
                Nenhuma chave de API encontrada
              </div>
            ) : (
              <div className="space-y-3">
                {knowledgeBase.keys.map((key, index) => {
                  const keyId = `${key.kbKey}-${index}`
                  const isVisible = visibleKeys.has(keyId)
                  const isCopied = copiedKeys.has(keyId)

                  return (
                    <div
                      key={keyId}
                      className="hover:bg-muted/50 border-border rounded-lg border-1 p-4 transition-colors"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {key.kbKeyAlias}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-muted flex-1 rounded px-3 py-2 font-mono text-sm">
                          {isVisible ? key.kbKey : maskKey(key.kbKey)}
                        </div>
                        <Button
                          onClick={() => toggleKeyVisibility(keyId)}
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          {isVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          onClick={() => copyKeyToClipboard(key.kbKey, keyId)}
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          {isCopied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <Separator />

          {/* Lista de arquivos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Arquivos</h3>
              <Button
                onClick={handleAddFiles}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar arquivos
              </Button>
            </div>

            {knowledgeBase.files.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">
                <FileText className="mx-auto mb-2 h-12 w-12 opacity-50" />
                <p>Nenhum arquivo encontrado</p>
              </div>
            ) : (
              <div className="max-h-60 space-y-2 overflow-y-auto">
                {knowledgeBase.files.map((file, index) => (
                  <div
                    key={`${file.fileName}-${index}`}
                    className="hover:bg-muted/50 border-border flex items-center justify-between rounded-lg border-1 p-3 transition-colors"
                  >
                    <div
                      className="flex min-w-0 flex-1 items-center gap-3"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <FileText className="text-primary h-5 w-5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-sm font-medium"
                          title={file.fileName}
                        >
                          {file.fileName}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatFileSize(file.sizeMB)}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRemoveFile(file.fileName)}
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Botões de ação */}
          <div className="flex justify-end gap-3">
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Fechar
            </Button>
            <Button
              onClick={handleTestKnowledgeBase}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Testar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
