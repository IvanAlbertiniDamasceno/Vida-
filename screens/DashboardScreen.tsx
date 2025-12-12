import React, { useState, useEffect } from 'react';
import { User, ActivityType, Screen } from '../types';
import { Activity, Moon, Coffee, Smile, ChevronRight, Watch } from 'lucide-react';

interface DashboardScreenProps {
  user: User;
  onNavigate: (screen: Screen, data?: any) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, onNavigate }) => {
  const [deviceSyncing, setDeviceSyncing] = useState(false);

  const handleSyncDevice = () => {
    setDeviceSyncing(true);
    // Simulate bluetooth/API sync
    setTimeout(() => {
      setDeviceSyncing(false);
      alert("Dispositivo sincronizado com sucesso! Dados de passos e batimentos cardíacos atualizados.");
    }, 2000);
  };

  const categories = [
    {
      id: ActivityType.EXERCISE,
      title: 'Exercícios',
      description: 'Atividade física',
      icon: <Activity className="w-6 h-6 text-white" />,
      color: 'bg-emerald-400',
      image: 'https://picsum.photos/id/73/100/100' // Gym/Exercise feel
    },
    {
      id: ActivityType.MEDITATION,
      title: 'Meditação',
      description: 'Saúde mental',
      icon: <Smile className="w-6 h-6 text-white" />,
      color: 'bg-indigo-400',
      image: 'https://picsum.photos/id/106/100/100' // Calm/Nature
    },
    {
      id: ActivityType.SLEEP,
      title: 'Sono',
      description: 'Qualidade do descanso',
      icon: <Moon className="w-6 h-6 text-white" />,
      color: 'bg-slate-400',
      image: 'https://picsum.photos/id/447/100/100' // Night/Dark
    },
    {
      id: ActivityType.NUTRITION,
      title: 'Alimentação',
      description: 'Dieta balanceada',
      icon: <Coffee className="w-6 h-6 text-white" />,
      color: 'bg-orange-400',
      image: 'https://picsum.photos/id/292/100/100' // Food
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="p-6 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">VIDA +</p>
                <h1 className="text-3xl font-serif font-bold text-slate-900">Olá, {user.firstName}</h1>
            </div>
            <button 
                onClick={handleSyncDevice} 
                className={`p-2 rounded-full ${deviceSyncing ? 'bg-blue-100 animate-pulse' : 'bg-slate-100'} hover:bg-slate-200 transition-colors`}
                title="Sincronizar Dispositivo"
            >
                <Watch className={`w-6 h-6 ${deviceSyncing ? 'text-blue-600' : 'text-slate-600'}`} />
            </button>
        </div>
        
        <div className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            <span className="font-semibold text-slate-800">O VIDA+ busca</span> oferecer recursos para hábitos saudáveis, organização da rotina e monitoramento da saúde mental e física.
          </p>
        </div>
      </header>

      {/* Categories Grid */}
      <div className="p-6 space-y-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onNavigate(Screen.TRACKING, { type: cat.id })}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow group text-left"
          >
            <div className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative ${cat.color}`}>
               <img src={cat.image} alt={cat.title} className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
               <div className="absolute inset-0 flex items-center justify-center">
                   {cat.icon}
               </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-700 transition-colors">{cat.title}</h3>
              <p className="text-xs text-slate-500">{cat.description}</p>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50">
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
            </div>
          </button>
        ))}
      </div>
      
      {/* Daily Tip CTA */}
      <div className="px-6">
        <button 
            onClick={() => onNavigate(Screen.EDUCATION)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 p-5 rounded-2xl text-white shadow-lg shadow-blue-200 flex items-center justify-between"
        >
            <div className="text-left">
                <p className="text-blue-100 text-xs uppercase font-bold tracking-wider mb-1">Dica do Dia</p>
                <p className="font-semibold text-lg">Receber conselho IA</p>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
                <Smile className="w-6 h-6 text-white" />
            </div>
        </button>
      </div>
    </div>
  );
};
