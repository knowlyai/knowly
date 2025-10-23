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
  Check,
  Code2,
  ChevronDown,
  ChevronUp
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
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [copiedCode, setCopiedCode] = useState(false)
  const [isCodeSectionExpanded, setIsCodeSectionExpanded] = useState(false)

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

  const getCodeSnippet = (language: string, apiKey: string) => {
    const apiUrl = 'https://api.knowly.dev.br/chat'

    switch (language) {
      case 'javascript':
        return `// JavaScript
fetch('${apiUrl}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    kb_key: '${apiKey}',
    model: 'MISTRAL_SMALL',
    prompt: 'Sua pergunta aqui'
  })
})
  .then(response => response.json())
  .then(data => console.log(data.response));`

      case 'python':
        return `# Python
import requests

response = requests.post(
    '${apiUrl}',
    headers={
        'Content-Type': 'application/json',
    },
    json={
        'kb_key': '${apiKey}',
        'model': 'MISTRAL_SMALL',
        'prompt': 'Sua pergunta aqui'
    }
)

data = response.json()
print(data['response'])`

      case 'java':
        return `// Java
import java.net.http.*;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${apiUrl}"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\\"prompt\\":\\"Sua pergunta aqui\\",\\"model\\":\\"MISTRAL_SMALL\\",\\"kb_key\\":\\"${apiKey}\\"}"
    ))
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`

      case 'csharp':
        return `// C# (.NET)
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();

var content = new StringContent(
    JsonSerializer.Serialize(new {
        prompt = "Sua pergunta aqui",
        model = "MISTRAL_SMALL",
        kb_key = "${apiKey}"
    }),
    Encoding.UTF8,
    "application/json"
);

var response = await client.PostAsync("${apiUrl}", content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);`

      case 'go':
        return `// Go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    payload := map[string]interface{}{
        "prompt": "Sua pergunta aqui",
        "kb_key":  "${apiKey}",
        "model":   "MISTRAL_SMALL"
    }
    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", "${apiUrl}",
        bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`

      case 'php':
        return `<?php
// PHP
$ch = curl_init('${apiUrl}');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'prompt' => 'Sua pergunta aqui',
    'kb_key' => '${apiKey}',
    'model' => 'MISTRAL_SMALL'
]));

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
echo $data['response'];`

      default:
        return ''
    }
  }

  const copyCodeToClipboard = async () => {
    const firstKey = knowledgeBase.keys[0]?.kbKey || 'YOUR_API_KEY'
    const code = getCodeSnippet(selectedLanguage, firstKey)

    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar código:', err)
    }
  }

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '📙' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'csharp', name: 'C# (.NET)', icon: '🔷' },
    { id: 'go', name: 'Go', icon: '🐹' },
    { id: 'php', name: 'PHP', icon: '🐘' }
  ]

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

          {/* Code Snippets */}
          <div className="space-y-4">
            <button
              onClick={() => setIsCodeSectionExpanded(!isCodeSectionExpanded)}
              className="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg p-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Exemplos de Código</h3>
              </div>
              {isCodeSectionExpanded ? (
                <ChevronUp className="text-muted-foreground h-5 w-5" />
              ) : (
                <ChevronDown className="text-muted-foreground h-5 w-5" />
              )}
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isCodeSectionExpanded
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                {knowledgeBase.keys.length === 0 ? (
                  <div className="text-muted-foreground py-4 text-center text-sm">
                    Crie uma API Key para ver os exemplos de código
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    {/* Language selector */}
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <Button
                          key={lang.id}
                          onClick={() => setSelectedLanguage(lang.id)}
                          size="sm"
                          variant={
                            selectedLanguage === lang.id ? 'default' : 'outline'
                          }
                          className="flex items-center gap-1.5"
                        >
                          <span>{lang.icon}</span>
                          <span>{lang.name}</span>
                        </Button>
                      ))}
                    </div>

                    {/* Code snippet */}
                    <div className="relative">
                      <pre className="bg-muted max-h-96 overflow-y-auto rounded-lg p-4 pr-20 text-sm">
                        <code className="text-foreground block break-words whitespace-pre-wrap">
                          {getCodeSnippet(
                            selectedLanguage,
                            knowledgeBase.keys[0]?.kbKey || 'YOUR_API_KEY'
                          )}
                        </code>
                      </pre>
                      <Button
                        onClick={copyCodeToClipboard}
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2 flex items-center gap-1"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
