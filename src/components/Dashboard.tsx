import { Plus, TrendingUp, Ruler, Scale, Activity, ChevronRight, Lightbulb, FileText, LogOut } from 'lucide-react';
import { MedicalRecord, getBMICategory, getWHRCategory } from '../lib/calculations';

type Props = {
  records: MedicalRecord[];
  userName: string;
  onNewConsult: () => void;
  onViewHistory: () => void;
  onViewAdvisor: (record: MedicalRecord) => void;
  onViewSheet: (record: MedicalRecord) => void;
  onLogout: () => void;
};

export function Dashboard({ records, userName, onNewConsult, onViewHistory, onViewAdvisor, onViewSheet, onLogout }: Props) {
  const latest = records[0] ?? null;

  return (
    <div className="space-y-8">
      {/* Header with Logout */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Bem-vindo,</p>
          <h1 className="text-2xl font-bold text-white">{userName}</h1>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950 border border-gray-800 p-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative z-10">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Monitore sua jornada
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Seu corpo, suas métricas<br />
            <span className="text-emerald-400">sua evolução</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg">
            Registre medidas, receba recomendações inteligentes e acompanhe sua transformação com dados reais.
          </p>
          <button
            onClick={onNewConsult}
            className="group inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            Nova Consulta Antropométrica
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      {latest ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Scale className="w-5 h-5" />}
              label="Peso"
              value={`${latest.weight_kg} kg`}
              sub="Última medição"
            />
            <StatCard
              icon={<Ruler className="w-5 h-5" />}
              label="Altura"
              value={`${latest.height_cm} cm`}
              sub="Última medição"
            />
            <BMICard bmi={latest.bmi} />
            <WHRCard whr={latest.whr} waist={latest.waist_cm} hip={latest.hip_cm} />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ActionButton
              icon={<Lightbulb className="w-5 h-5" />}
              label="IA Advisor"
              desc="Recomendações personalizadas"
              onClick={() => onViewAdvisor(latest)}
            />
            <ActionButton
              icon={<FileText className="w-5 h-5" />}
              label="Ficha Técnica"
              desc="Visualizar e exportar"
              onClick={() => onViewSheet(latest)}
            />
            <ActionButton
              icon={<TrendingUp className="w-5 h-5" />}
              label="Histórico"
              desc={`${records.length} medição(ões)`}
              onClick={onViewHistory}
            />
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/50 p-10 text-center">
          <Activity className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Nenhuma medição registrada ainda.</p>
          <p className="text-gray-600 text-xs mt-1">Clique em "Nova Consulta" para começar sua jornada.</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-center gap-2 text-gray-400 mb-3">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-600 mt-1">{sub}</p>
    </div>
  );
}

function BMICard({ bmi }: { bmi: number }) {
  const cat = getBMICategory(bmi);
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-center gap-2 text-gray-400 mb-3">
        <Activity className="w-5 h-5" />
        <span className="text-xs font-medium uppercase tracking-wider">IMC</span>
      </div>
      <p className="text-2xl font-bold text-white">{bmi.toFixed(1)}</p>
      <span className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full border mt-2 ${cat.bg} ${cat.color}`}>
        {cat.label}
      </span>
    </div>
  );
}

function WHRCard({ whr, waist, hip }: { whr: number | null; waist: number | null; hip: number | null }) {
  if (!whr || !waist || !hip) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 text-gray-400 mb-3">
          <TrendingUp className="w-5 h-5" />
          <span className="text-xs font-medium uppercase tracking-wider">RCQ</span>
        </div>
        <p className="text-2xl font-bold text-gray-600">--</p>
        <p className="text-xs text-gray-600 mt-1">Não informados</p>
      </div>
    );
  }
  const cat = getWHRCategory(whr, false);
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-center gap-2 text-gray-400 mb-3">
        <TrendingUp className="w-5 h-5" />
        <span className="text-xs font-medium uppercase tracking-wider">RCQ</span>
      </div>
      <p className="text-2xl font-bold text-white">{whr.toFixed(2)}</p>
      <span className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full border mt-2 ${cat.bg} ${cat.color}`}>
        {cat.label}
      </span>
    </div>
  );
}

function ActionButton({ icon, label, desc, onClick }: { icon: React.ReactNode; label: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-start gap-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-emerald-500/30 rounded-2xl p-5 transition-all text-left"
    >
      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0" />
    </button>
  );
}
