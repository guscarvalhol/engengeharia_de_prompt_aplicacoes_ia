import { ArrowLeft, Lightbulb, Zap } from 'lucide-react';
import { MedicalRecord } from '../lib/calculations';
import { generateRecommendations, Recommendation } from '../lib/advisor';

type Props = {
  record: MedicalRecord;
  onBack: () => void;
};

export function Advisor({ record, onBack }: Props) {
  const recommendations = generateRecommendations(record);
  const high = recommendations.filter(r => r.priority === 'high');
  const medium = recommendations.filter(r => r.priority === 'medium');

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Voltar</span>
      </button>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">SelfMetrics Advisor</h2>
        </div>
        <p className="text-gray-400">Recomendações personalizadas baseadas em seus dados antropométricos</p>
      </div>

      {/* Priority Section */}
      {high.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/30 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Ações Prioritárias
          </h3>
          <div className="space-y-3">
            {high.map((rec, i) => (
              <RecommendationCard key={i} rec={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Medium Priority */}
      {medium.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-emerald-400">Recomendações Adicionais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {medium.map((rec, i) => (
              <RecommendationCard key={i} rec={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Habit Tracker CTA */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center">
        <p className="text-emerald-300 font-semibold mb-3">Comece a implementar hoje!</p>
        <p className="text-gray-400 text-sm mb-4">
          Escolha uma recomendação acima e dedique 30 dias a ela. Consistência é a chave do sucesso.
        </p>
        <button className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold px-6 py-2 rounded-xl transition-all hover:scale-105 active:scale-95">
          <Zap className="w-4 h-4" />
          Rastrear Hábito
        </button>
      </div>
    </div>
  );
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  const categoryColors = {
    nutrition: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    exercise: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    health: 'bg-red-500/10 border-red-500/30 text-red-400',
    lifestyle: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  };

  const categoryLabels = {
    nutrition: 'Nutrição',
    exercise: 'Exercício',
    health: 'Saúde',
    lifestyle: 'Estilo de Vida',
  };

  const colors = categoryColors[rec.category];
  const label = categoryLabels[rec.category];

  return (
    <div className={`border rounded-xl p-4 ${colors}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{rec.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-white">{rec.title}</h4>
            <span className="text-xs px-2 py-1 rounded-full bg-black/20 font-semibold uppercase">{label}</span>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">{rec.description}</p>
        </div>
      </div>
    </div>
  );
}
