import React from 'react'
import { Button } from '@/shared/components/button'
import { CheckIcon } from 'lucide-react' // ou outro pacote de ícones SVG

// Componente Card genérico
type CardProps = {
  title: string
  price: string
  period?: string
  features: string[]
  buttonText: string
  onButtonClick?: () => void
}

export function Card({
  title,
  price,
  period = 'p/month',
  features,
  buttonText,
  onButtonClick
}: CardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 p-6 shadow-lg ring-1 ring-transparent transition-shadow duration-300 hover:shadow-2xl hover:ring-indigo-400">
      <div>
        <h4 className="text-sm font-medium text-gray-400 uppercase">{title}</h4>
        <div className="mt-4 flex items-baseline gap-x-1">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          <span className="text-lg text-gray-400">{period}</span>
        </div>
        <ul className="mt-6 space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-x-2 text-gray-300">
              <CheckIcon className="h-5 w-5 text-indigo-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Button
          variant="default"
          size="md"
          onClick={onButtonClick}
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
