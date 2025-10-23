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
        'mt-8 mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight first:mt-0 lg:text-5xl',
        'from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-transparent',
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
        'border-border mt-10 mb-4 scroll-m-20 border-b-1 pb-2 text-3xl font-bold tracking-tight first:mt-0',
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
    <p
      className={cn(
        'text-foreground/80 mb-6 leading-7 [&:not(:first-child)]:mt-6',
        className
      )}
    >
      {children}
    </p>
  )
}

export function ul({ children, className }: TypographyProps) {
  return (
    <ul className={cn('mb-6 ml-6 list-disc space-y-3', className)}>
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
        'bg-muted/50 border-border mt-6 mb-6 overflow-x-auto rounded-xl border-1 p-4 text-sm backdrop-blur',
        className
      )}
    >
      <code className="text-foreground font-mono">{children}</code>
    </pre>
  )
}

export function code({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        'bg-muted/50 border-border relative rounded-md border-1 px-2 py-1 font-mono text-sm',
        className
      )}
    >
      {children}
    </code>
  )
}

export function blockquote({ children, className }: TypographyProps) {
  return (
    <blockquote
      className={cn(
        'border-primary/30 bg-primary/5 mt-6 mb-6 border-l-4 py-4 pr-4 pl-6 italic',
        className
      )}
    >
      {children}
    </blockquote>
  )
}
