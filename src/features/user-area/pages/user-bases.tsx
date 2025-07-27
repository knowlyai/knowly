import { Background } from '@/shared/components/background'
import { BackgroundBlobs } from '@/shared/components/background-blobs'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import {
  ArrowUpDown,
  ArrowDownAZ,
  ArrowUpAZ,
  Calendar,
  FileText,
  MessageCircle,
  Plus
} from 'lucide-react'
import { Input } from '@/shared/components/input'
import { Button } from '@/shared/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/shared/components/card'
import clsx from 'clsx'

// Mock data for demonstration
const mockBases = [
  {
    id: '1',
    name: 'Base Jurídica',
    filesCount: 12,
    filesSizeMB: 34.2,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-06-20'),
    chatCreditsUsed: 120
  },
  {
    id: '2',
    name: 'Base de Suporte',
    filesCount: 5,
    filesSizeMB: 8.7,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-06-25'),
    chatCreditsUsed: 45
  },
  {
    id: '3',
    name: 'Base Comercial',
    filesCount: 20,
    filesSizeMB: 50.1,
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-05-30'),
    chatCreditsUsed: 300
  }
]

type OrderBy = 'name' | 'createdAt' | 'updatedAt'
type OrderDirection = 'asc' | 'desc'

export function UserBasesPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState<OrderBy>('name')
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('asc')

  function handleOrderChange(field: OrderBy) {
    if (orderBy === field) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(field)
      setOrderDirection('asc')
    }
  }

  const filteredBases = useMemo(() => {
    const bases = mockBases.filter((base) =>
      base.name.toLowerCase().includes(search.toLowerCase())
    )
    bases.sort((a, b) => {
      const aValue: string | number | Date = a[orderBy]
      const bValue: string | number | Date = b[orderBy]
      if (aValue instanceof Date && bValue instanceof Date) {
        return orderDirection === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime()
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return orderDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return orderDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      return 0
    })
    return bases
  }, [search, orderBy, orderDirection])

  return (
    <Background className="relative isolate overflow-hidden">
      <BackgroundBlobs />
      <Layout className="bg-background min-h-screen min-w-screen">
        <main className="justify-top mt-20 flex w-full flex-1 flex-col items-center p-12 pl-80">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl"
          >
            <section>
              <div className="mb-8 flex w-full flex-col gap-4">
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full max-w-md gap-2">
                    <Input
                      placeholder="Buscar base pelo nome..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="text-foreground border-primary focus:border-primary w-full ring-0"
                    />
                    <Button
                      variant="secondary"
                      className="whitespace-nowrap"
                      onClick={() => {
                        navigate('/create-knowladge-base') // Ajustar o caminho ou ação, se necessário
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Nova base
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleOrderChange('name')}
                      className="flex items-center gap-2"
                    >
                      Nome
                      {orderBy === 'name' &&
                        (orderDirection === 'asc' ? (
                          <ArrowDownAZ className="h-4 w-4" />
                        ) : (
                          <ArrowUpAZ className="h-4 w-4" />
                        ))}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleOrderChange('createdAt')}
                      className="flex items-center gap-2"
                    >
                      Criação
                      {orderBy === 'createdAt' && (
                        <ArrowUpDown
                          className={clsx(
                            'h-4 w-4',
                            orderDirection === 'asc' ? 'rotate-180' : ''
                          )}
                        />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleOrderChange('updatedAt')}
                      className="flex items-center gap-2"
                    >
                      Última alteração
                      {orderBy === 'updatedAt' && (
                        <ArrowUpDown
                          className={clsx(
                            'h-4 w-4',
                            orderDirection === 'asc' ? 'rotate-180' : ''
                          )}
                        />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredBases.length === 0 && (
                  <div className="text-muted-foreground col-span-full py-12 text-center">
                    Nenhuma base encontrada.
                  </div>
                )}
                {filteredBases.map((base) => (
                  <Card
                    key={base.id}
                    className="hover:bg-muted cursor-pointer transition-shadow hover:shadow-lg"
                    onClick={() => navigate(`/bases/${base.id}`)}
                  >
                    <CardHeader>
                      <CardTitle className="truncate">{base.name}</CardTitle>
                      <CardDescription>
                        Criada em {base.createdAt.toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="text-primary h-4 w-4" />
                        <span>
                          {base.filesCount} arquivo
                          {base.filesCount !== 1 && 's'} ({base.filesSizeMB} MB)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="text-primary h-4 w-4" />
                        <span>
                          Última modificação:{' '}
                          {base.updatedAt.toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MessageCircle className="text-primary h-4 w-4" />
                        <span>
                          Créditos de chat usados: {base.chatCreditsUsed}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </motion.div>
        </main>
      </Layout>
    </Background>
  )
}

export default UserBasesPage
