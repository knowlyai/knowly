import { cn } from '../utils/cn'

type BackgroundProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function Background({ children, className, ...props }: BackgroundProps) {
  return (
    <div
      className={cn(
        'text-foreground flex h-auto min-h-screen w-full flex-col items-center justify-center transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
