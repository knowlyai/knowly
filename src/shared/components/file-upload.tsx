import React, { useCallback, useState } from 'react'
import { Upload, X, FileText } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { Button } from '@/shared/components/button'

interface FileUploadProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  accept?: string
  maxFiles?: number
  className?: string
}

export function FileUpload({
  files,
  onFilesChange,
  accept = '.pdf',
  maxFiles = 10,
  className
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      const pdfFiles = droppedFiles.filter(
        (file) => file.type === 'application/pdf'
      )

      if (pdfFiles.length + files.length > maxFiles) {
        alert(`Máximo de ${maxFiles} arquivos permitidos`)
        return
      }

      onFilesChange([...files, ...pdfFiles])
    },
    [files, onFilesChange, maxFiles]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])
      const pdfFiles = selectedFiles.filter(
        (file) => file.type === 'application/pdf'
      )

      if (pdfFiles.length + files.length > maxFiles) {
        alert(`Máximo de ${maxFiles} arquivos permitidos`)
        return
      }

      onFilesChange([...files, ...pdfFiles])
      e.target.value = '' // Reset input
    },
    [files, onFilesChange, maxFiles]
  )

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index)
      onFilesChange(newFiles)
    },
    [files, onFilesChange]
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const totalSize = files.reduce((acc, file) => acc + file.size, 0)

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        className={cn(
          'rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          isDragOver
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <div className="space-y-2">
          <p className="text-lg font-medium">
            Arraste e solte seus arquivos PDF aqui
          </p>
          <p className="text-muted-foreground">
            ou clique para selecionar arquivos
          </p>
          <div className="pt-2">
            <Button type="button" variant="outline" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Selecionar arquivos
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept={accept}
                  onChange={handleFileSelect}
                  className="sr-only"
                />
              </label>
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            Máximo {maxFiles} arquivos, apenas PDF
          </p>
        </div>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Arquivos selecionados ({files.length})
            </h3>
            <div className="text-muted-foreground text-sm">
              Total: {formatFileSize(totalSize)}
            </div>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="bg-muted/50 flex items-center justify-between rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-red-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="hover:bg-destructive/10 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
