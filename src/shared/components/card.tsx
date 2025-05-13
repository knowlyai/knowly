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
    <div className="hover:shadow-4xl flex w-[300px] flex-col rounded-xl bg-gradient-to-b from-[var(--color-purple-100)] to-[var(--color-background-100)] p-6 shadow-lg ring-1 ring-transparent transition-shadow duration-300 hover:ring-[var(--color-green-60)]">
      <div>
        <h4 className="text-sm font-medium text-white/50 uppercase">{title}</h4>
        <div className="mt-4 flex items-baseline justify-center gap-x-1">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          <span className="text-center text-lg text-white/50">{period}</span>
        </div>
        <ul className="mt-6 space-y-5 text-left">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-x-4 text-left text-white/50"
            >
              <CheckIcon className="text-green-60 h-5 w-5" />
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
