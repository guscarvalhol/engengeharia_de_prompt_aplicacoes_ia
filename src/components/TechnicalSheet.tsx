import { ArrowLeft, Download, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MedicalRecord, getBMICategory, getWHRCategory } from '../lib/calculations';
import { getRecordsInRange } from '../lib/medical';

type Props = {
  record: MedicalRecord;
  onBack: () => void;
  userId: string;
};

export function TechnicalSheet({ record, onBack, userId }: Props) {
  const records = getRecordsInRange(userId, 30);
  const previous = records.find(r => r.id !== record.id);

  const bmiCat = getBMICategory(record.bmi);
  const whrCat = record.whr ? getWHRCategory(record.whr, false) : null;

  const weightDelta = previous ? record.weight_kg - previous.weight_kg : 0;
  const bmiDelta = previous ? record.bmi - previous.bmi : 0;
  const whrDelta = previous && record.whr && previous.whr ? record.whr - previous.whr : 0;

  function handleExport() {
    const html = generateHTML(record, previous, bmiCat, whrCat);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ficha-tecnica-${new Date(record.created_at).toISOString().split('T')[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar</span>
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
        >
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </div>

      {/* Sheet */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8 pb-8 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white mb-2">FICHA TÉCNICA ANTROPOMÉTRICA</h1>
          <p className="text-gray-500 text-sm">
            {new Date(record.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <MetricBox label="Peso" value={`${record.weight_kg} kg`} delta={weightDelta} unit="kg" />
          <MetricBox label="Altura" value={`${record.height_cm} cm`} />
          <MetricBox label="IMC" value={bmiCat.label} sub={record.bmi.toFixed(1)} delta={bmiDelta} />
          {record.neck_cm && <MetricBox label="Pescoço" value={`${record.neck_cm} cm`} />}
          {record.chest_cm && <MetricBox label="Tórax" value={`${record.chest_cm} cm`} />}
          {record.waist_cm && <MetricBox label="Cintura" value={`${record.waist_cm} cm`} />}
          {record.hip_cm && <MetricBox label="Quadril" value={`${record.hip_cm} cm`} />}
          {record.bicep_cm && <MetricBox label="Bíceps" value={`${record.bicep_cm} cm`} />}
          {record.thigh_cm && <MetricBox label="Coxa" value={`${record.thigh_cm} cm`} />}
          {record.whr && <MetricBox label="RCQ" value={whrCat?.label} sub={record.whr.toFixed(2)} delta={whrDelta} />}
        </div>

        {/* Classifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className={`border-l-4 p-4 rounded-lg ${bmiCat.bg}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Classificação IMC</p>
            <p className={`text-lg font-bold ${bmiCat.color}`}>{bmiCat.label}</p>
            <p className="text-sm text-gray-400 mt-2">
              {record.bmi < 18.5 && 'Aumento de peso recomendado'}
              {record.bmi >= 18.5 && record.bmi < 25 && 'Peso saudável'}
              {record.bmi >= 25 && record.bmi < 30 && 'Redução moderada de peso recomendada'}
              {record.bmi >= 30 && 'Consulte um profissional de saúde'}
            </p>
          </div>

          {whrCat && (
            <div className={`border-l-4 p-4 rounded-lg ${whrCat.bg}`}>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Classificação RCQ</p>
              <p className={`text-lg font-bold ${whrCat.color}`}>{whrCat.label}</p>
              <p className="text-sm text-gray-400 mt-2">
                {whrCat.label === 'Baixo Risco' && 'Distribuição de gordura saudável'}
                {whrCat.label === 'Risco Moderado' && 'Monitore a circunferência abdominal'}
                {whrCat.label === 'Alto Risco' && 'Aumento de exercício aeróbico recomendado'}
              </p>
            </div>
          )}
        </div>

        {/* Comparison */}
        {previous && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Comparação com avaliação anterior
            </h3>
            <div className="space-y-2 text-sm">
              <ComparisonRow
                label="Peso"
                current={`${record.weight_kg} kg`}
                previous={`${previous.weight_kg} kg`}
                delta={weightDelta}
                unit="kg"
              />
              <ComparisonRow
                label="IMC"
                current={record.bmi.toFixed(1)}
                previous={previous.bmi.toFixed(1)}
                delta={bmiDelta}
              />
              {record.whr && previous.whr && (
                <ComparisonRow
                  label="RCQ"
                  current={record.whr.toFixed(2)}
                  previous={previous.whr.toFixed(2)}
                  delta={whrDelta}
                />
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-600">
            Gerado pelo SelfMetrics — Autoavaliação Antropométrica
          </p>
          <p className="text-xs text-gray-700 mt-1">
            {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricBox({ label, value, sub, delta, unit }: {
  label: string;
  value: string;
  sub?: string;
  delta?: number;
  unit?: string;
}) {
  const Icon = delta == null ? null : delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  const deltaColor = delta == null ? '' : delta > 0 ? 'text-red-400' : delta < 0 ? 'text-emerald-400' : 'text-gray-400';

  return (
    <div className="border border-gray-700 rounded-lg p-3 text-center hover:border-emerald-500/30 transition-colors">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
      {sub && <p className="text-sm text-gray-400">{sub}</p>}
      {Icon && delta !== 0 && (
        <p className={`text-xs mt-1 flex items-center justify-center gap-1 ${deltaColor}`}>
          <Icon className="w-3 h-3" />
          {Math.abs(delta!).toFixed(1)}{unit ?? ''}
        </p>
      )}
    </div>
  );
}

function ComparisonRow({ label, current, previous, delta, unit }: {
  label: string;
  current: string;
  previous: string;
  delta: number;
  unit?: string;
}) {
  const Icon = delta === 0 ? Minus : delta > 0 ? TrendingUp : TrendingDown;
  const color = delta === 0 ? 'text-gray-400' : delta > 0 ? 'text-red-400' : 'text-emerald-400';

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-gray-500">{previous}</span>
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-white font-semibold">{current}</span>
        {delta !== 0 && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${color.replace('text-', 'bg-').replace('-400', '-500/20')} ${color}`}>
            {delta > 0 ? '+' : ''}{Math.abs(delta).toFixed(1)}{unit ?? ''}
          </span>
        )}
      </div>
    </div>
  );
}

function generateHTML(
  record: MedicalRecord,
  previous: MedicalRecord | undefined,
  bmiCat: any,
  whrCat: any
): string {
  const date = new Date(record.created_at).toLocaleDateString('pt-BR');
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Ficha Técnica - ${date}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 40px; background: #f5f5f5; }
    .sheet { background: white; max-width: 800px; margin: 0 auto; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { text-align: center; color: #333; margin-bottom: 10px; }
    .date { text-align: center; color: #999; margin-bottom: 30px; font-size: 14px; }
    .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
    .metric { padding: 15px; border: 1px solid #ddd; border-radius: 8px; text-align: center; }
    .metric-label { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 8px; }
    .metric-value { font-size: 20px; font-weight: bold; color: #333; }
    .metric-sub { font-size: 14px; color: #999; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; color: #333; margin-bottom: 15px; }
    .classification { padding: 15px; border-left: 4px solid #10b981; background: #ecfdf5; margin-bottom: 10px; }
    .footer { border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; text-align: center; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="sheet">
    <h1>FICHA TÉCNICA ANTROPOMÉTRICA</h1>
    <p class="date">${date}</p>

    <div class="section">
      <div class="metrics">
        <div class="metric">
          <div class="metric-label">Peso</div>
          <div class="metric-value">${record.weight_kg} kg</div>
        </div>
        <div class="metric">
          <div class="metric-label">Altura</div>
          <div class="metric-value">${record.height_cm} cm</div>
        </div>
        <div class="metric">
          <div class="metric-label">IMC</div>
          <div class="metric-value">${record.bmi.toFixed(1)}</div>
          <div class="metric-sub">${bmiCat.label}</div>
        </div>
        ${record.neck_cm ? `<div class="metric"><div class="metric-label">Pescoço</div><div class="metric-value">${record.neck_cm} cm</div></div>` : ''}
        ${record.chest_cm ? `<div class="metric"><div class="metric-label">Tórax</div><div class="metric-value">${record.chest_cm} cm</div></div>` : ''}
        ${record.waist_cm ? `<div class="metric"><div class="metric-label">Cintura</div><div class="metric-value">${record.waist_cm} cm</div></div>` : ''}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Classificações</div>
      <div class="classification">
        <strong>IMC: ${bmiCat.label}</strong>
        <p>${record.bmi < 18.5 ? 'Aumento de peso recomendado' : record.bmi >= 18.5 && record.bmi < 25 ? 'Peso saudável' : 'Consulte um profissional'}</p>
      </div>
    </div>

    <div class="footer">
      <p>Gerado pelo SelfMetrics — Autoavaliação Antropométrica</p>
    </div>
  </div>
</body>
</html>
  `;
}
