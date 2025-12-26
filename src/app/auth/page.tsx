'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Flame, Mail, Lock, User, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [configError, setConfigError] = useState(false)

  useEffect(() => {
    // Verificar se as variáveis de ambiente estão configuradas
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      setConfigError(true)
      setError('Configuração do Supabase pendente. Clique no banner laranja acima para configurar.')
    }
  }, [])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (configError) {
      setError('Configure as variáveis de ambiente do Supabase primeiro.')
      return
    }

    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        // Verificar se usuário pagou
        const { data: userData } = await supabase
          .from('users')
          .select('has_paid')
          .eq('id', data.user.id)
          .single()

        if (userData?.has_paid) {
          router.push('/quiz')
        } else {
          // Redirecionar para página de pagamento (por enquanto vai pro quiz)
          router.push('/quiz')
        }
      } else {
        // Cadastro
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (error) throw error

        // Criar registro na tabela users
        if (data.user) {
          await supabase.from('users').insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            has_paid: false,
          })

          // Redirecionar para quiz
          router.push('/quiz')
        }
      }
    } catch (err: any) {
      console.error('Erro de autenticação:', err)
      setError(err.message || 'Erro ao processar autenticação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Flame className="w-10 h-10 text-purple-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ConstanFit
            </h1>
          </div>
          <p className="text-gray-400">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </p>
        </div>

        {/* Alerta de configuração */}
        {configError && (
          <div className="mb-6 bg-orange-500/10 border border-orange-500/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-300">
              <p className="font-semibold mb-1">Configuração necessária</p>
              <p>Configure suas credenciais do Supabase no banner laranja acima para habilitar a autenticação.</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Seu nome"
                    required={!isLogin}
                    disabled={configError}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="seu@email.com"
                  required
                  disabled={configError}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={configError}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || configError}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                'Processando...'
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Criar conta'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
              disabled={configError}
            >
              {isLogin
                ? 'Não tem conta? Cadastre-se'
                : 'Já tem conta? Faça login'}
            </button>
          </div>
        </div>

        {/* Informação de pagamento */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Acesso completo por apenas R$ 9,90</p>
          <p className="text-xs mt-1">Pagamento único • Acesso vitalício</p>
        </div>
      </div>
    </div>
  )
}
