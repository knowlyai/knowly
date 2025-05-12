import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../utils/cn'

export type AccordionItemProps = {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ title, children, defaultOpen = false, className }, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<string>('0px')

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight
      setMaxHeight(isOpen ? `${scrollHeight}px` : '0px')
    }
  }, [isOpen, children])

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
            'ml-2 flex-1 text-left font-semibold transition-colors',
            isOpen ? 'text-white' : 'text-white/80'
          )}
        >
          {title}
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="transition-max-height overflow-hidden duration-300 ease-in-out"
      >
        <div className="mt-2 font-medium text-white/70">{children}</div>
      </div>
    </div>
  )
})

AccordionItem.displayName = 'AccordionItem'

export type AccordionProps = {
  children: React.ReactElement<AccordionItemProps>[]
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className
}) => {
  return (
    <div
      className={cn(
        'w-full rounded-2xl bg-[#2c2c54]/60 p-6 shadow-lg backdrop-blur-md',
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
