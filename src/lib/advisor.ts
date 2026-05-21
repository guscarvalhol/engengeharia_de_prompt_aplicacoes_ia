import { MedicalRecord, getBMICategory, getWHRCategory } from '../lib/calculations';

export type Recommendation = {
  category: 'nutrition' | 'exercise' | 'health' | 'lifestyle';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
};

export function generateRecommendations(record: MedicalRecord): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const bmiCat = getBMICategory(record.bmi);
  const whrCat = record.whr ? getWHRCategory(record.whr, false) : null;

  // BMI-based recommendations
  if (record.bmi < 18.5) {
    recommendations.push({
      category: 'nutrition',
      title: 'Aumentar Aporte Calórico',
      description: 'Você está abaixo do peso ideal. Aumente o consumo de alimentos ricos em proteínas e calorias saudáveis.',
      priority: 'high',
      icon: '🥗',
    });
    recommendations.push({
      category: 'exercise',
      title: 'Exercícios de Ganho de Massa',
      description: 'Foque em musculação e exercícios de resistência para ganho muscular saudável.',
      priority: 'high',
      icon: '💪',
    });
  } else if (record.bmi > 25) {
    recommendations.push({
      category: 'exercise',
      title: 'Aumentar Atividade Física',
      description: 'Caminhe 30 minutos diários ou faça exercícios aeróbicos 3x por semana.',
      priority: 'high',
      icon: '🚶',
    });
    recommendations.push({
      category: 'nutrition',
      title: 'Reduzir Calorias Vazias',
      description: 'Diminua refrigerantes, doces e alimentos ultraprocessados. Priorize frutas, legumes e proteínas magras.',
      priority: 'high',
      icon: '🥗',
    });
  }

  // WHR-based recommendations
  if (whrCat?.label.includes('Alto')) {
    recommendations.push({
      category: 'nutrition',
      title: 'Reduzir Sódio e Inflamação',
      description: 'Diminua sal, açúcar refinado e alimentos inflamatórios. Aumente fibras e alimentos anti-inflamatórios.',
      priority: 'high',
      icon: '🧂',
    });
    recommendations.push({
      category: 'exercise',
      title: 'Exercícios Aeróbicos Regulares',
      description: 'Faça 150 minutos de cardio moderado por semana. Piscina, corrida ou bicicleta são ideais.',
      priority: 'high',
      icon: '🏃',
    });
  }

  // General health recommendations
  recommendations.push({
    category: 'health',
    title: 'Hidratação Diária',
    description: 'Beba 2-3 litros de água por dia. Hidratação adequada melhora metabolismo e saúde geral.',
    priority: 'medium',
    icon: '💧',
  });

  recommendations.push({
    category: 'health',
    title: 'Dormir 7-8 Horas',
    description: 'Sono adequado é essencial para recuperação e manutenção do peso corporal saudável.',
    priority: 'medium',
    icon: '😴',
  });

  recommendations.push({
    category: 'nutrition',
    title: 'Aumentar Consumo de Fibras',
    description: 'Coma 25-30g de fibra diariamente através de frutas, legumes e grãos integrais.',
    priority: 'medium',
    icon: '🌾',
  });

  recommendations.push({
    category: 'lifestyle',
    title: 'Avaliações Periódicas',
    description: 'Repita suas medições a cada 30 dias para acompanhar progresso e ajustar estratégias.',
    priority: 'medium',
    icon: '📊',
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
