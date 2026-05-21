import { Activity, Heart, TrendingUp, Zap, ChevronRight } from 'lucide-react';

type Props = {
  onGetStarted: () => void;
};

export function Landing({ onGetStarted }: Props) {
  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Hero */}
      <div className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-semibold">Seu caminho para a transformação</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Seu corpo, suas </span>
            <span className="text-emerald-400">métricas, sua evolução</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            O autocuidado começa com o que você pode medir. Acompanhe sua jornada antropométrica com dados reais e recomendações personalizadas.
          </p>

          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 hover:scale-105 active:scale-95"
          >
            <Activity className="w-5 h-5" />
            Comece sua Avaliação
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          icon={<Heart className="w-6 h-6" />}
          title="Saúde Preventiva"
          description="Identifique riscos cardiovasculares e metabólicos antes que se tornem problemas. A prevenção é o melhor remédio."
        />

        <InfoCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Evolução Visível"
          description="Compare suas medições ao longo do tempo. Veja gráficos de progresso e celebre cada pequena vitória."
        />

        <InfoCard
          icon={<Zap className="w-6 h-6" />}
          title="Hábitos Inteligentes"
          description="Receba recomendações personalizadas de nutrição, exercícios e longevidade baseadas em seus dados."
        />

        <InfoCard
          icon={<Activity className="w-6 h-6" />}
          title="Antropometria Completa"
          description="Peso, altura, perímetros corporais. Análise IMC e RCQ para compreender sua composição corporal."
        />

        <InfoCard
          icon={<Heart className="w-6 h-6" />}
          title="Recomendações de IA"
          description="Sistema inteligente que analisa seus dados e sugere melhorias específicas para sua saúde."
        />

        <InfoCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Fichas Técnicas"
          description="Organize seus dados em fichas profissionais. Exporte históricos e comparações para acompanhamento profissional."
        />
      </div>

      {/* Longevity Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Dicas de Longevidade</h2>

        <div className="space-y-4">
          <Tip title="Movimento Diário" desc="30 minutos de atividade física moderada reduzem risco de doenças crônicas em até 35%." />
          <Tip title="Hidratação Inteligente" desc="2-3 litros de água por dia melhora metabolismo, pele e função cognitiva." />
          <Tip title="Nutrição Balanceada" desc="Frutas, verduras e proteínas magras são a base de uma vida saudável e longa." />
          <Tip title="Sono Reparador" desc="7-8 horas de sono regulam peso, imunidade e saúde mental." />
          <Tip title="Controle do Estresse" desc="Meditação e mindfulness reduzem inflamação crônica e aumentam longevidade." />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group bg-gray-900 border border-gray-800 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function Tip({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-emerald-500/30 transition-all">
      <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-1">{title}</p>
      <p className="text-gray-300 text-sm">{desc}</p>
    </div>
  );
}
