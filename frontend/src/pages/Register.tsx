import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router'

import Button from '../components/common/Button'
import Input from '../components/common/Input'

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!formData.email.trim()) nextErrors.email = 'Email is required.'
    if (!formData.password.trim()) nextErrors.password = 'Password is required.'
    if (!formData.confirmPassword.trim()) nextErrors.confirmPassword = 'Please confirm your password.'
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-[#181818]">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-gray-500 dark:text-gray-300">Create account</p>
        <h1 className="mb-8 text-3xl font-medium tracking-tight text-black dark:text-white">Register</h1>

        {submitted ? (
          <div className="rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Your account has been created successfully.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full name"
            value={formData.fullName}
            onChange={handleChange('fullName')}
            error={errors.fullName}
            placeholder="Alex Morgan"
          />

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
            placeholder="Create a password"
          />

          <Input
            label="Confirm password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={errors.confirmPassword}
            placeholder="Repeat your password"
          />

          <Button type="submit" fullWidth>
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
