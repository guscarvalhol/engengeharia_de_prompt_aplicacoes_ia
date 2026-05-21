import { ArrowLeft, TrendingUp, TrendingDown, Minus, Calendar, Trash2 } from 'lucide-react';
import { Measurement } from '../lib/supabase';
import { getBMICategory } from '../lib/calculations';

type Props = {
  measurements: Measurement[];
  onBack: () => void;
};

export function History({ measurements, onBack }: Props) {
  if (measurements.length === 0) {
    return (
      <div className="space-y-6">
        <BackButton onBack={onBack} />
        <div className="text-center py-16">
          <TrendingUp className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma medição registrada.</p>
        </div>
      </div>
    );
  }

  const sorted = [...measurements].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const maxBMI = Math.max(...sorted.map(m => m.bmi));
  const minBMI = Math.min(...sorted.map(m => m.bmi));
  const maxWeight = Math.max(...sorted.map(m => m.weight_kg));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BackButton onBack={onBack} />
        <span className="text-sm text-gray-500">{sorted.length} medição(ões)</span>
      </div>

      <h2 className="text-2xl font-bold text-white">Histórico de Medições</h2>

      {/* Mini Evolution Chart (BMI bar chart) */}
      {sorted.length >= 2 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Evolução do IMC</h3>
          <div className="flex items-end gap-2 h-20">
            {sorted.slice().reverse().map((m, i) => {
              const pct = maxBMI > 0 ? ((m.bmi - minBMI) / (maxBMI - minBMI || 1)) * 70 + 30 : 50;
              const cat = getBMICategory(m.bmi);
              return (
                <div key={m.id} className="flex flex-col items-center gap-1 flex-1 group">
                  <span className="text-xs text-gray-600 group-hover:text-white transition-colors hidden sm:block">
                    {m.bmi.toFixed(1)}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${cat.color.replace('text-', 'bg-').replace('-400', '-500/70')} hover:opacity-100 opacity-80`}
                    style={{ height: `${pct}%` }}
                    title={`${m.bmi.toFixed(1)} — ${new Date(m.created_at).toLocaleDateString('pt-BR')}`}
                  />
                  {i === sorted.length - 1 || i === 0 ? (
                    <span className="text-xs text-gray-700 hidden sm:block">
                      {new Date(sorted.slice().reverse()[i].created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </span>
                  ) : <span className="text-xs opacity-0">-</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Measurements Table */}
      <div className="space-y-3">
        {sorted.map((m, i) => {
          const prev = sorted[i + 1];
          const bmiDelta = prev ? m.bmi - prev.bmi : 0;
          const weightDelta = prev ? m.weight_kg - prev.weight_kg : 0;
          const cat = getBMICategory(m.bmi);

          return (
            <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">
                      {new Date(m.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                    {i === 0 && (
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        Mais recente
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <MetricBadge label="Peso" value={`${m.weight_kg} kg`} delta={weightDelta !== 0 ? weightDelta : undefined} unit="kg" />
                    <MetricBadge label="Altura" value={`${m.height_cm} cm`} />
                    <div className={`px-3 py-1.5 rounded-xl border ${cat.bg} flex flex-col min-w-[80px]`}>
                      <span className="text-xs text-gray-400">IMC</span>
                      <span className={`text-sm font-bold ${cat.color}`}>{m.bmi.toFixed(1)}</span>
                      <span className={`text-xs ${cat.color}`}>{cat.label}</span>
                    </div>
                    {m.whr && (
                      <MetricBadge label="RCQ" value={m.whr.toFixed(2)} delta={bmiDelta !== 0 ? bmiDelta : undefined} />
                    )}
                  </div>
                </div>
                <WeightBar weight={m.weight_kg} maxWeight={maxWeight} />
              </div>

              {/* Perimeters */}
              {(m.neck_cm || m.chest_cm || m.waist_cm || m.hip_cm || m.bicep_cm || m.thigh_cm) && (
                <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {[
                    { k: 'neck_cm', label: 'Pescoço' }, { k: 'chest_cm', label: 'Tórax' },
                    { k: 'waist_cm', label: 'Cintura' }, { k: 'hip_cm', label: 'Quadril' },
                    { k: 'bicep_cm', label: 'Bíceps' }, { k: 'thigh_cm', label: 'Coxa' },
                  ].filter(f => m[f.k as keyof Measurement]).map(f => (
                    <div key={f.k} className="text-center">
                      <p className="text-xs text-gray-600">{f.label}</p>
                      <p className="text-sm font-semibold text-gray-300">{m[f.k as keyof Measurement]} cm</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm">Voltar ao Dashboard</span>
    </button>
  );
}

function MetricBadge({ label, value, delta, unit }: { label: string; value: string; delta?: number; unit?: string }) {
  const Icon = delta == null ? null : delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  const deltaColor = delta == null ? '' : delta > 0 ? 'text-red-400' : delta < 0 ? 'text-emerald-400' : 'text-gray-400';

  return (
    <div className="px-3 py-1.5 rounded-xl border border-gray-700 bg-gray-800/60 flex flex-col min-w-[70px]">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
      {Icon && delta !== 0 && (
        <span className={`text-xs flex items-center gap-0.5 ${deltaColor}`}>
          <Icon className="w-3 h-3" />
          {Math.abs(delta!).toFixed(1)}{unit ?? ''}
        </span>
      )}
    </div>
  );
}

function WeightBar({ weight, maxWeight }: { weight: number; maxWeight: number }) {
  const pct = maxWeight > 0 ? (weight / maxWeight) * 100 : 50;
  return (
    <div className="flex flex-col items-end gap-1 min-w-[80px]">
      <span className="text-xs text-gray-500">Peso relativo</span>
      <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-400">{weight} kg</span>
    </div>
  );
}
