import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router'

import Button from '../components/common/Button'
import Input from '../components/common/Input'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: 'email' | 'password') => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: { email?: string; password?: string } = {}

    if (!formData.email.trim()) nextErrors.email = 'Email is required.'
    if (!formData.password.trim()) nextErrors.password = 'Password is required.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-[#181818]">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-gray-500 dark:text-gray-300">Welcome back</p>
        <h1 className="mb-8 text-3xl font-medium tracking-tight text-black dark:text-white">Login</h1>

        {submitted ? (
          <div className="rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Login successful. Welcome back to NOVA.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email address"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-300">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(event) => setFormData((current) => ({ ...current, remember: event.target.checked }))}
                className="h-4 w-4 accent-black dark:accent-white"
              />
              Remember me
            </label>

            <a href="#" className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
              Forgot password?
            </a>
          </div>

          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          New to NOVA?{' '}
          <Link to="/register" className="font-medium text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
