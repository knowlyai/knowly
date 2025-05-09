/* eslint-disable react/prop-types */
import React from 'react'
import { cn } from '../utils/cn'

type ButtonProps = {
  variant?: 'default' | 'icon' | 'muted' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'none'
  type?: 'button' | 'submit' | 'reset'
} & React.HTMLAttributes<HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'default', size = 'md', type = 'submit', ...props },
    ref
  ) => {
    const variants: { [key: string]: string } = {
      default: 'bg-gradient-to-b from-blue-60 to-blue-80 ',
      muted: 'bg-gray-80',
      icon: 'min-w-[50px] bg-gray p-2 place-items-center'
    }

    const sizes: { [key: string]: string } = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-8 py-2 text-lg',
      lg: 'px-12 py-4 text-xl',
      none: ''
    }

    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          'cursor-pointer rounded-md text-lg font-medium text-white shadow-md transition-colors duration-200 disabled:cursor-default disabled:opacity-50',
          sizes[size],
          variants[variant],
          props.className
        )}
        type={type}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
