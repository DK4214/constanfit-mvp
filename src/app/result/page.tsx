'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Flame, Target, TrendingUp, ArrowRight } from 'lucide-react'

export default function ResultPage() {
  const router = useRouter()
  const [quizData, setQuizData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadQuizData()
  }, [])

  const loadQuizData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      const { data } = await supabase
        .from('quiz_responses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      setQuizData(data)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGoalMessage = (goal: string) => {
    switch (goal) {
      case 'Emagrecer':
        return 'Com base no seu objetivo de emagrecimento, você pode alcançar resultados incríveis com um plano simples e consistente.'
      case 'Ganhar massa muscular':
        return 'Para ganhar massa muscular de forma eficiente, você precisa de constância no treino e alimentação adequada.'
      case 'Manter saúde':
        return 'Manter a saúde é um objetivo nobre! Com hábitos consistentes, você pode ter uma vida mais equilibrada e saudável.'
      default:
        return 'Com base nas suas respostas, você pode melhorar seus resultados com um plano simples e consistente.'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <Flame className="w-16 h-16 text-purple-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Analisando suas respostas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Flame className="w-10 h-10 text-purple-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ConstanFit
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Parabéns, {quizData?.name}! 🎉
          </h2>
          <p className="text-xl text-gray-400">
            Analisamos seu perfil e temos ótimas notícias
          </p>
        </div>

        {/* Result Card */}
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Seu Objetivo</h3>
              <p className="text-purple-400 text-lg font-semibold">{quizData?.goal}</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">
            {getGoalMessage(quizData?.goal)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Altura</p>
              <p className="text-2xl font-bold text-white">{quizData?.height} cm</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Peso</p>
              <p className="text-2xl font-bold text-white">{quizData?.weight} kg</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Nível</p>
              <p className="text-2xl font-bold text-white">{quizData?.activity_level}</p>
            </div>
          </div>

          <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-purple-400 mb-1">Potencial de crescimento</p>
                <p className="text-gray-300 text-sm">
                  Com o ConstanFit, você terá todas as ferramentas necessárias para alcançar seus objetivos de forma consistente e sustentável.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Section */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold mb-2">
              Acesso completo ao ConstanFit
            </h3>
            <p className="text-gray-300">
              Tenha acesso vitalício a todas as funcionalidades
            </p>
          </div>

          <div className="bg-black/30 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-gray-400 line-through text-2xl">R$ 49,90</span>
              <span className="text-5xl font-bold text-white">R$ 9,90</span>
            </div>
            <p className="text-center text-purple-400 font-semibold">
              Pagamento único • Acesso vitalício
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              'Controle alimentar completo',
              'Acompanhamento de medicações',
              'Registro de sintomas',
              'Sistema de ofensiva de dias',
              'Conquistas e gamificação',
              'Suporte prioritário',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">{feature}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push('/payment')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Garantir meu acesso agora
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            🔒 Pagamento seguro • Garantia de 7 dias
          </p>
        </div>

        {/* Trust Badges */}
        <div className="text-center text-gray-400 text-sm">
          <p>Mais de 10.000 pessoas já transformaram suas vidas com o ConstanFit</p>
        </div>
      </div>
    </div>
  )
}
