import React, { useState, useEffect } from 'react';
import { ActivityType, Screen } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Save } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { analyzeMood } from '../services/geminiService';

interface TrackingScreenProps {
  type: ActivityType;
  onBack: () => void;
}

const mockData = [
  { day: 'Seg', value: 3 },
  { day: 'Ter', value: 5 },
  { day: 'Qua', value: 4 },
  { day: 'Qui', value: 2 },
  { day: 'Sex', value: 5 },
  { day: 'Sáb', value: 4 },
  { day: 'Dom', value: 5 },
];

export const TrackingScreen: React.FC<TrackingScreenProps> = ({ type, onBack }) => {
  const [value, setValue] = useState(3);
  const [note, setNote] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset state when type changes
  useEffect(() => {
    setFeedback('');
    setNote('');
    setValue(3);
  }, [type]);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API save
    await new Promise(r => setTimeout(r, 800));
    
    if (type === ActivityType.MOOD) {
        const aiFeedback = await analyzeMood(value, note);
        setFeedback(aiFeedback);
    } else {
        setFeedback("Registro salvo com sucesso! Continue assim.");
    }
    setLoading(false);
  };

  const getTitle = () => {
    switch (type) {
      case ActivityType.EXERCISE: return 'Exercícios';
      case ActivityType.MEDITATION: return 'Meditação';
      case ActivityType.SLEEP: return 'Sono';
      case ActivityType.NUTRITION: return 'Alimentação';
      case ActivityType.MOOD: return 'Humor';
      default: return 'Atividade';
    }
  };

  const getUnit = () => {
     switch (type) {
      case ActivityType.EXERCISE: return 'minutos';
      case ActivityType.MEDITATION: return 'minutos';
      case ActivityType.SLEEP: return 'horas';
      case ActivityType.NUTRITION: return 'calorias (x100)';
      case ActivityType.MOOD: return 'nível (1-5)';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 flex items-center gap-4 border-b border-slate-100">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">{getTitle()}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        
        {/* Chart Section */}
        <div className="bg-slate-50 p-4 rounded-2xl mb-8 shadow-inner">
          <h3 className="text-sm font-medium text-slate-500 mb-4">Histórico Semanal</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis hide domain={[0, 6]} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }} 
                />
                <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4, stroke: '#fff' }} 
                    activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Registro de hoje ({getUnit()})
                </label>
                <div className="flex items-center gap-4">
                    <input 
                        type="range" 
                        min="1" 
                        max={type === ActivityType.SLEEP ? "12" : type === ActivityType.MOOD ? "5" : "60"} 
                        step="1"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-2xl font-bold text-blue-600 w-12 text-center">{value}</span>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Notas
                </label>
                <textarea 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    rows={3}
                    placeholder="Como você se sentiu?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>

            {feedback && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-800 text-sm animate-fade-in">
                    <p className="font-semibold mb-1">Feedback VIDA+:</p>
                    {feedback}
                </div>
            )}

            <Button onClick={handleSave} isLoading={loading}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Registro
            </Button>
        </div>
      </div>
    </div>
  );
};
