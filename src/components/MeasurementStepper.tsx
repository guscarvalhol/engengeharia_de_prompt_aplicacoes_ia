import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Scale, Ruler, Activity, TrendingUp } from 'lucide-react';
import { calcBMI, calcWHR, getBMICategory, getWHRCategory } from '../lib/calculations';

type FormData = {
  weight_kg: string;
  height_cm: string;
  neck_cm: string;
  chest_cm: string;
  waist_cm: string;
  hip_cm: string;
  bicep_cm: string;
  thigh_cm: string;
};

type Props = {
  onSave: (data: {
    weight_kg: number;
    height_cm: number;
    neck_cm: number | null;
    chest_cm: number | null;
    waist_cm: number | null;
    hip_cm: number | null;
    bicep_cm: number | null;
    thigh_cm: number | null;
    bmi: number;
    whr: number | null;
  }) => Promise<void>;
  onCancel: () => void;
};

const STEPS = [
  { id: 0, title: 'Medidas Principais', icon: Scale, description: 'Peso e altura são essenciais para o cálculo do IMC.' },
  { id: 1, title: 'Perímetros Corporais', icon: Ruler, description: 'Medidas de circunferência para análise corporal completa.' },
  { id: 2, title: 'Resultado', icon: Activity, description: 'Veja sua análise antropométrica completa.' },
];

const empty: FormData = {
  weight_kg: '', height_cm: '', neck_cm: '', chest_cm: '',
  waist_cm: '', hip_cm: '', bicep_cm: '', thigh_cm: '',
};

export function MeasurementStepper({ onSave, onCancel }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [saving, setSaving] = useState(false);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const weight = parseFloat(form.weight_kg);
  const height = parseFloat(form.height_cm);
  const waist = parseFloat(form.waist_cm) || null;
  const hip = parseFloat(form.hip_cm) || null;

  const bmi = weight > 0 && height > 0 ? calcBMI(weight, height) : null;
  const whr = waist && hip ? calcWHR(waist, hip) : null;
  const bmiCat = bmi ? getBMICategory(bmi) : null;
  const whrCat = whr ? getWHRCategory(whr, false) : null;

  const canNext0 = weight > 0 && height > 0;

  async function handleSave() {
    if (!bmi) return;
    setSaving(true);
    await onSave({
      weight_kg: weight,
      height_cm: height,
      neck_cm: parseFloat(form.neck_cm) || null,
      chest_cm: parseFloat(form.chest_cm) || null,
      waist_cm: waist,
      hip_cm: hip,
      bicep_cm: parseFloat(form.bicep_cm) || null,
      thigh_cm: parseFloat(form.thigh_cm) || null,
      bmi,
      whr,
    });
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      {/* Stepper Header */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1 last:flex-none">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 ${
                i < step
                  ? 'border-emerald-500 bg-emerald-500 text-gray-950 cursor-pointer'
                  : i === step
                  ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400'
                  : 'border-gray-700 bg-transparent text-gray-600'
              }`}
            >
              {i < step ? <Check className="w-4 h-4" strokeWidth={3} /> : <s.icon className="w-4 h-4" />}
            </button>
            <span className={`text-sm font-medium hidden sm:block ${
              i === step ? 'text-white' : i < step ? 'text-emerald-400' : 'text-gray-600'
            }`}>
              {s.title}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${i < step ? 'bg-emerald-500' : 'bg-gray-800'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">{STEPS[step].title}</h2>
          <p className="text-gray-400 text-sm mt-1">{STEPS[step].description}</p>
        </div>

        {step === 0 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                label="Peso (kg)"
                value={form.weight_kg}
                onChange={set('weight_kg')}
                placeholder="Ex: 75.5"
                required
              />
              <InputField
                label="Altura (cm)"
                value={form.height_cm}
                onChange={set('height_cm')}
                placeholder="Ex: 175"
                required
              />
            </div>
            {bmi && bmiCat && (
              <LiveResult label="IMC calculado" value={bmi.toFixed(1)} category={bmiCat} />
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Pescoço (cm)" value={form.neck_cm} onChange={set('neck_cm')} placeholder="Ex: 38" />
              <InputField label="Tórax (cm)" value={form.chest_cm} onChange={set('chest_cm')} placeholder="Ex: 95" />
              <InputField label="Cintura (cm)" value={form.waist_cm} onChange={set('waist_cm')} placeholder="Ex: 80" />
              <InputField label="Quadril (cm)" value={form.hip_cm} onChange={set('hip_cm')} placeholder="Ex: 96" />
              <InputField label="Bíceps (cm)" value={form.bicep_cm} onChange={set('bicep_cm')} placeholder="Ex: 35" />
              <InputField label="Coxa (cm)" value={form.thigh_cm} onChange={set('thigh_cm')} placeholder="Ex: 55" />
            </div>
            {whr && whrCat && (
              <LiveResult label="RCQ calculado" value={whr.toFixed(2)} category={whrCat} />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <ResultSummary form={form} bmi={bmi} whr={whr} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => (step === 0 ? onCancel() : setStep(s => s - 1))}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          {step === 0 ? 'Cancelar' : 'Voltar'}
        </button>

        {step < 2 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={step === 0 && !canNext0}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-emerald-500/20"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-60 shadow-lg shadow-emerald-500/20"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-gray-950/40 border-t-gray-950 rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" strokeWidth={2.5} />
                Salvar Medição
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, required }: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-300 mb-1.5 block">
        {label}
        {required && <span className="text-emerald-400 ml-1">*</span>}
      </span>
      <input
        type="number"
        step="0.1"
        min="0"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
      />
    </label>
  );
}

function LiveResult({ label, value, category }: {
  label: string;
  value: string;
  category: { label: string; color: string; bg: string };
}) {
  return (
    <div className="flex items-center gap-4 bg-gray-800/60 border border-gray-700 rounded-xl p-4">
      <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
      <span className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full border ${category.bg} ${category.color}`}>
        {category.label}
      </span>
    </div>
  );
}

function ResultSummary({ form, bmi, whr }: { form: FormData; bmi: number | null; whr: number | null }) {
  const rows: { label: string; value: string; highlight?: boolean }[] = [
    { label: 'Peso', value: `${form.weight_kg} kg`, highlight: true },
    { label: 'Altura', value: `${form.height_cm} cm`, highlight: true },
    ...(bmi ? [{ label: 'IMC', value: `${bmi.toFixed(1)} — ${getBMICategory(bmi).label}`, highlight: true }] : []),
    ...(whr ? [{ label: 'RCQ', value: `${whr.toFixed(2)} — ${getWHRCategory(whr, false).label}`, highlight: true }] : []),
    ...(form.neck_cm ? [{ label: 'Pescoço', value: `${form.neck_cm} cm` }] : []),
    ...(form.chest_cm ? [{ label: 'Tórax', value: `${form.chest_cm} cm` }] : []),
    ...(form.waist_cm ? [{ label: 'Cintura', value: `${form.waist_cm} cm` }] : []),
    ...(form.hip_cm ? [{ label: 'Quadril', value: `${form.hip_cm} cm` }] : []),
    ...(form.bicep_cm ? [{ label: 'Bíceps', value: `${form.bicep_cm} cm` }] : []),
    ...(form.thigh_cm ? [{ label: 'Coxa', value: `${form.thigh_cm} cm` }] : []),
  ];

  return (
    <div className="space-y-2">
      {rows.map(r => (
        <div key={r.label} className={`flex items-center justify-between px-4 py-3 rounded-xl ${r.highlight ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-gray-800/60 border border-gray-700/60'}`}>
          <span className={`text-sm ${r.highlight ? 'text-emerald-300 font-semibold' : 'text-gray-400'}`}>{r.label}</span>
          <span className={`text-sm font-bold ${r.highlight ? 'text-emerald-400' : 'text-white'}`}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}
