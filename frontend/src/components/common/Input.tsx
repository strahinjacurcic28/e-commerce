import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  containerClassName?: string
}

function Input({
  label,
  error,
  containerClassName = '',
  className = '',
  ...props
}: InputProps) {
  return (
    <label className={`block w-full ${containerClassName}`}>
      {label ? <span className="mb-2 block text-sm font-medium text-gray-700">{label}</span> : null}
      <input
        className={[
          'w-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition',
          'focus:border-black',
          error ? 'border-red-500' : '',
          className,
        ].join(' ')}
        {...props}
      />
      {error ? <span className="mt-2 block text-xs text-red-600">{error}</span> : null}
    </label>
  )
}

export default Input
