import React, { useState } from 'react'
import { cn } from '../utils/cn'

export type AccordionItemProps = {
  /** Texto da pergunta ou título do item */
  title: string
  /** Conteúdo que será exibido quando o item estiver aberto */
  children: React.ReactNode
  /** Defina se o item deve vir aberto por padrão */
  defaultOpen?: boolean
  /** Classe adicional para estilização */
  className?: string
}

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ title, children, defaultOpen = false, className }, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div
      ref={ref}
      className={cn(
        'border-b border-white/10 py-4 transition-colors',
        className
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <svg
          className={cn(
            'h-6 w-6 transform transition-transform',
            isOpen ? 'rotate-45 text-white' : 'text-white/80'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span
          className={cn(
            'font-semibold transition-colors',
            isOpen ? 'text-white' : 'text-white/80'
          )}
        >
          {title}
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 font-medium text-white/70">{children}</div>
      )}
    </div>
  )
})

AccordionItem.displayName = 'AccordionItem'

export type AccordionProps = {
  /** Array de itens a serem renderizados */
  children: React.ReactElement<AccordionItemProps>[]
  /** Classe adicional para o container */
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className
}) => {
  return (
    <div
      className={cn(
        'w-full max-w-2xl rounded-2xl bg-[#2c2c54]/60 p-6 shadow-lg backdrop-blur-md',
        className
      )}
    >
      {React.Children.map(children, (child, idx) =>
        React.cloneElement(child, {
          key: idx
        })
      )}
    </div>
  )
}

Accordion.displayName = 'Accordion'