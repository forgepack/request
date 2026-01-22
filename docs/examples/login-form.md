# Formulário de Login Completo

## 📝 Exemplo Básico

```tsx
// src/components/LoginForm.tsx
import React, { useState } from 'react'
import { useAuth } from '@hidrografico/request'

export const LoginForm = () => {
  const { loginUser, isAuthenticated, role } = useAuth()
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '' 
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors([])
    
    try {
      const result = await loginUser(credentials)
      
      if (result.success) {
        console.log('Login realizado!', result.data)
        // Usuário será redirecionado automaticamente
      } else {
        setErrors(result.errors.map((err: any) => err.message))
      }
    } catch (error) {
      setErrors(['Erro interno. Tente novamente.'])
    } finally {
      setLoading(false)
    }
  }

  // Se já está autenticado, mostra informações do usuário
  if (isAuthenticated) {
    return (
      <div className="welcome-card">
        <h2>Bem-vindo!</h2>
        <p>Suas permissões: {role.join(', ')}</p>
        <button onClick={() => window.location.href = '/dashboard'}>
          Ir para Dashboard
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Entrar</h2>
      
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="error">{error}</p>
          ))}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          placeholder="Digite seu usuário"
          value={credentials.username}
          onChange={(e) => setCredentials({
            ...credentials, 
            username: e.target.value
          })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          value={credentials.password}
          onChange={(e) => setCredentials({
            ...credentials, 
            password: e.target.value
          })}
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={loading || !credentials.username || !credentials.password}
        className="submit-button"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

## 🎨 Exemplo com Styled Components

```tsx
// src/components/StyledLoginForm.tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '@hidrografico/request'

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: white;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`

const Button = styled.button`
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background: #0056b3;
  }
`

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
`

export const StyledLoginForm = () => {
  const { loginUser, isAuthenticated } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError('') // Limpa erro ao digitar
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await loginUser(form)
    
    if (!result.success) {
      setError('Credenciais inválidas')
    }
    
    setLoading(false)
  }

  if (isAuthenticated) {
    return <div>Redirecionando...</div>
  }

  return (
    <LoginContainer>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Input
          name="username"
          placeholder="Usuário"
          value={form.username}
          onChange={handleChange}
          required
        />
        
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </Form>
    </LoginContainer>
  )
}
```

## 🔄 Exemplo com React Hook Form

```tsx
// src/components/HookFormLogin.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@hidrografico/request'

interface LoginData {
  username: string
  password: string
  rememberMe: boolean
}

export const HookFormLogin = () => {
  const { loginUser } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginData>({
    defaultValues: {
      rememberMe: false
    }
  })

  const onSubmit = async (data: LoginData) => {
    const result = await loginUser({
      username: data.username,
      password: data.password
    })

    if (!result.success) {
      // Define erros específicos nos campos
      result.errors.forEach((error: any) => {
        if (error.field === 'username') {
          setError('username', { message: error.message })
        } else if (error.field === 'password') {
          setError('password', { message: error.message })
        }
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username">Usuário</label>
        <input
          {...register('username', {
            required: 'Usuário é obrigatório',
            minLength: {
              value: 3,
              message: 'Mínimo de 3 caracteres'
            }
          })}
          className={errors.username ? 'error' : ''}
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          {...register('password', {
            required: 'Senha é obrigatória',
            minLength: {
              value: 6,
              message: 'Mínimo de 6 caracteres'
            }
          })}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            {...register('rememberMe')}
          />
          Lembrar de mim
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

## 📱 Exemplo Mobile-First

```tsx
// src/components/MobileLoginForm.tsx
import React, { useState } from 'react'
import { useAuth } from '@hidrografico/request'

export const MobileLoginForm = () => {
  const { loginUser } = useAuth()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await loginUser(credentials)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Entrar na sua conta
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              required
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Digite seu usuário"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="mt-1 block w-full px-3 py-3 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Digite sua senha"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
```