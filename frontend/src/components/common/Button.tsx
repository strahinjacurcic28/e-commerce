import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200',
    secondary: 'bg-white text-black border border-black hover:bg-gray-100 dark:bg-[#1b1b1b] dark:text-white dark:border-white/30 dark:hover:bg-[#222222]',
    ghost: 'bg-transparent text-black hover:bg-gray-100 dark:text-white dark:hover:bg-white/10',
  }

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base',
  }

  return (
    <button
      className={[
        'inline-flex items-center justify-center font-medium transition duration-200 ease-out',
        'disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
