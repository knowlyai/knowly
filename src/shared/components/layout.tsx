import { cn } from '../utils/cn'

type LayoutProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function Layout({ children, className, ...props }: LayoutProps) {
  return (
    <div
      className={cn(
        'flex w-5/6 max-w-[1920px] flex-col items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
