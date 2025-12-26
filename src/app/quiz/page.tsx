'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Flame } from 'lucide-react'

type QuizData = {
  name: string
  birthDate: string
  height: string
  weight: string
  age: string
  gender: string
  goal: string
  activityLevel: string
  insecurities: string
}

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<QuizData>({
    name: '',
    birthDate: '',
    height: '',
    weight: '',
    age: '',
    gender: '',
    goal: '',
    activityLevel: '',
    insecurities: '',
  })

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth')
      return
    }
    setUserId(user.id)
  }

  const questions = [
    {
      id: 'name',
      label: 'Qual é o seu nome?',
      type: 'text',
      placeholder: 'Digite seu nome',
    },
    {
      id: 'birthDate',
      label: 'Qual é a sua data de nascimento?',
      type: 'date',
      placeholder: '',
    },
    {
      id: 'height',
      label: 'Qual é a sua altura? (em cm)',
      type: 'number',
      placeholder: 'Ex: 170',
    },
    {
      id: 'weight',
      label: 'Qual é o seu peso? (em kg)',
      type: 'number',
      placeholder: 'Ex: 70',
    },
    {
      id: 'age',
      label: 'Qual é a sua idade?',
      type: 'number',
      placeholder: 'Ex: 25',
    },
    {
      id: 'gender',
      label: 'Qual é o seu sexo? (opcional)',
      type: 'select',
      options: ['Prefiro não informar', 'Masculino', 'Feminino', 'Outro'],
    },
    {
      id: 'goal',
      label: 'Qual é o seu objetivo principal?',
      type: 'select',
      options: ['Emagrecer', 'Ganhar massa muscular', 'Manter saúde'],
    },
    {
      id: 'activityLevel',
      label: 'Qual é o seu nível de atividade física?',
      type: 'select',
      options: ['Iniciante', 'Intermediário', 'Avançado'],
    },
    {
      id: 'insecurities',
      label: 'Quais são suas principais inseguranças?',
      type: 'textarea',
      placeholder: 'Descreva suas principais preocupações...',
    },
  ]

  const currentQuestion = questions[currentStep]

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!userId) return

    setLoading(true)
    try {
      await supabase.from('quiz_responses').insert({
        user_id: userId,
        name: formData.name,
        birth_date: formData.birthDate,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        age: parseInt(formData.age),
        gender: formData.gender || null,
        goal: formData.goal,
        activity_level: formData.activityLevel,
        insecurities: formData.insecurities,
      })

      router.push('/result')
    } catch (error) {
      console.error('Erro ao salvar quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (value: string) => {
    setFormData({
      ...formData,
      [currentQuestion.id]: value,
    })
  }

  const isCurrentStepValid = () => {
    const value = formData[currentQuestion.id as keyof QuizData]
    if (currentQuestion.id === 'gender') return true // opcional
    return value && value.trim() !== ''
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Flame className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ConstanFit
            </h1>
          </div>
          <p className="text-gray-400">
            Passo {currentStep + 1} de {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">{currentQuestion.label}</h2>

          {currentQuestion.type === 'text' && (
            <input
              type="text"
              value={formData[currentQuestion.id as keyof QuizData]}
              onChange={(e) => updateFormData(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder={currentQuestion.placeholder}
            />
          )}

          {currentQuestion.type === 'number' && (
            <input
              type="number"
              value={formData[currentQuestion.id as keyof QuizData]}
              onChange={(e) => updateFormData(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder={currentQuestion.placeholder}
            />
          )}

          {currentQuestion.type === 'date' && (
            <input
              type="date"
              value={formData[currentQuestion.id as keyof QuizData]}
              onChange={(e) => updateFormData(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          )}

          {currentQuestion.type === 'select' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData(option)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                    formData[currentQuestion.id as keyof QuizData] === option
                      ? 'bg-purple-600/20 border-purple-500 text-white'
                      : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'textarea' && (
            <textarea
              value={formData[currentQuestion.id as keyof QuizData]}
              onChange={(e) => updateFormData(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors min-h-[120px]"
              placeholder={currentQuestion.placeholder}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!isCurrentStepValid() || loading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
          >
            {loading ? (
              'Processando...'
            ) : currentStep === questions.length - 1 ? (
              <>
                Finalizar
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Próximo
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
