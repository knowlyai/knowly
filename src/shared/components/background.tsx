import { cn } from '../utils/cn'

type BackgroundProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function Background({ children, className, ...props }: BackgroundProps) {
  return (
    <div
      className={cn(
        'text-foreground to-background/90 from-background flex h-auto min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
