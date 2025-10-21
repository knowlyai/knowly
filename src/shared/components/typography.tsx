import { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function h1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'mt-8 mb-6 scroll-m-20 text-4xl font-bold tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </h1>
  )
}

export function h2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        'mt-8 mb-4 scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h2>
  )
}

export function h3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        'mt-6 mb-3 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  )
}

export function p({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-foreground/80 mb-4 leading-7', className)}>
      {children}
    </p>
  )
}

export function ul({ children, className }: TypographyProps) {
  return (
    <ul className={cn('mb-4 ml-6 list-disc space-y-2', className)}>
      {children}
    </ul>
  )
}

export function li({ children, className }: TypographyProps) {
  return (
    <li className={cn('text-foreground/80 leading-7', className)}>
      {children}
    </li>
  )
}

export function pre({ children, className }: TypographyProps) {
  return (
    <pre
      className={cn(
        'bg-muted border-border mb-4 overflow-x-auto rounded-lg border-1 p-4 text-sm',
        className
      )}
    >
      <code className="text-foreground">{children}</code>
    </pre>
  )
}

export function code({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-1.5 py-0.5 font-mono text-sm',
        className
      )}
    >
      {children}
    </code>
  )
}
