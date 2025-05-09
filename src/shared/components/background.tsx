import { cn } from '../utils/cn'

type BackgroundProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function Background({ children, className, ...props }: BackgroundProps) {
  return (
    <div
      className={cn(
        'bg-background-100 flex h-auto min-h-screen w-full flex-col items-center text-white',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
