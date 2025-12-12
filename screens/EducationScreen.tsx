import React, { useState } from 'react';
import { ActivityType } from '../types';
import { getHealthTip } from '../services/geminiService';
import { Button } from '../components/Button';
import { ArrowLeft, Lightbulb, Sparkles } from 'lucide-react';

interface EducationScreenProps {
  onBack: () => void;
}

export const EducationScreen: React.FC<EducationScreenProps> = ({ onBack }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ActivityType | null>(null);

  const handleAsk = async (topic: ActivityType) => {
    setSelectedTopic(topic);
    setLoading(true);
    const tip = await getHealthTip(topic);
    setContent(tip);
    setLoading(false);
  };

  const topics = [
    { type: ActivityType.SLEEP, label: 'Higiene do Sono' },
    { type: ActivityType.NUTRITION, label: 'Nutrição Consciente' },
    { type: ActivityType.EXERCISE, label: 'Motivação Física' },
    { type: ActivityType.MEDITATION, label: 'Mindfulness' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 flex items-center gap-4 bg-white shadow-sm">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Educação e Bem-estar</h2>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="text-center mb-8">
            <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">O que você quer aprender hoje?</h3>
            <p className="text-slate-500 text-sm">Selecione um tópico para receber uma dica personalizada da nossa IA.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
            {topics.map((t) => (
                <button
                    key={t.type}
                    onClick={() => handleAsk(t.type)}
                    disabled={loading}
                    className={`p-4 rounded-xl text-sm font-medium transition-all ${selectedTopic === t.type ? 'bg-slate-800 text-white shadow-lg transform scale-105' : 'bg-white text-slate-600 shadow-sm hover:bg-slate-100'}`}
                >
                    {t.label}
                </button>
            ))}
        </div>

        {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p>Gerando conhecimento...</p>
            </div>
        ) : content && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 animate-slide-up">
                <div className="flex items-center gap-2 mb-4 text-purple-600">
                    <Lightbulb className="w-5 h-5" />
                    <span className="font-bold text-sm uppercase tracking-wider">Dica Inteligente</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                    "{content}"
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 text-right">
                    <span className="text-xs text-slate-400 italic">Gerado por Gemini AI</span>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
