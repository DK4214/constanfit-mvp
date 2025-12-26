'use client'

import { Flame, Zap, Target, TrendingUp, Star, ArrowRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="inline-flex items-center gap-3 mb-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-3">
            <Flame className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ConstanFit
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Transforme Seu Corpo
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Com Constância
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Descubra seu plano de treino personalizado e alcance seus objetivos fitness de forma consistente e eficaz
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/auth')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/50"
          >
            Adquira por apenas R$ 9,90
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="mt-4 text-sm text-gray-400">
            Pagamento único • Acesso vitalício
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Por que escolher o{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ConstanFit?
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Plano Personalizado',
                description: 'Treinos adaptados aos seus objetivos, nível e disponibilidade',
              },
              {
                icon: Zap,
                title: 'Resultados Rápidos',
                description: 'Metodologia comprovada para maximizar seus ganhos',
              },
              {
                icon: TrendingUp,
                title: 'Progresso Constante',
                description: 'Acompanhe sua evolução e mantenha-se motivado',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            O que você vai receber
          </h2>

          <div className="space-y-6">
            {[
              'Plano de treino personalizado baseado em suas respostas',
              'Exercícios detalhados com instruções claras',
              'Acompanhamento de progresso e evolução',
              'Acesso vitalício por apenas R$ 9,90',
              'Suporte para dúvidas e ajustes',
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-gradient-to-r from-gray-800/30 to-transparent backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            O que nossos usuários dizem
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'João Silva',
                text: 'Perdi 15kg em 3 meses seguindo o plano. Incrível!',
                rating: 5,
              },
              {
                name: 'Maria Santos',
                text: 'Finalmente encontrei um treino que se adapta à minha rotina.',
                rating: 5,
              },
              {
                name: 'Pedro Costa',
                text: 'Melhor investimento que fiz na minha saúde. Vale cada centavo!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>
                <p className="font-semibold text-purple-400">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para começar sua transformação?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Junte-se a milhares de pessoas que já transformaram seus corpos
          </p>
          <button
            onClick={() => router.push('/auth')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/50"
          >
            Adquira por apenas R$ 9,90
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 ConstanFit. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
