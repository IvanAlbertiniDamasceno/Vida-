import React, { useState } from 'react';
import { Screen, User, ActivityType } from './types';
import { RegisterScreen } from './screens/RegisterScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { TrackingScreen } from './screens/TrackingScreen';
import { EducationScreen } from './screens/EducationScreen';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [user, setUser] = useState<User | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>(ActivityType.EXERCISE);

  // Splash Screen Logic
  React.useEffect(() => {
    if (currentScreen === Screen.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentScreen(Screen.REGISTER);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleRegister = (newUser: User) => {
    setUser(newUser);
    setCurrentScreen(Screen.DASHBOARD);
  };

  const handleNavigate = (screen: Screen, data?: any) => {
    if (data && data.type) {
        setSelectedActivity(data.type);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH:
        return (
          <div className="h-full flex flex-col items-center justify-center bg-[#b4d4cf]">
             <div className="animate-bounce mb-6">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
                   <Activity className="w-12 h-12 text-slate-800" />
                </div>
             </div>
             <h1 className="text-3xl font-bold text-slate-800 tracking-widest">VIDA +</h1>
          </div>
        );
      case Screen.REGISTER:
        return <RegisterScreen onRegister={handleRegister} />;
      case Screen.DASHBOARD:
        return user ? <DashboardScreen user={user} onNavigate={handleNavigate} /> : null;
      case Screen.TRACKING:
        return <TrackingScreen type={selectedActivity} onBack={() => setCurrentScreen(Screen.DASHBOARD)} />;
      case Screen.EDUCATION:
        return <EducationScreen onBack={() => setCurrentScreen(Screen.DASHBOARD)} />;
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-0 md:p-4 font-sans">
      {/* Mobile container simulator */}
      <div className="w-full h-full md:h-[800px] md:max-w-[400px] bg-white md:rounded-[3rem] overflow-hidden shadow-2xl relative border-[8px] border-slate-900/5">
        
        {/* iOS-like status bar area (visual only) */}
        <div className="h-6 w-full bg-transparent absolute top-0 left-0 z-50 pointer-events-none"></div>
        
        {/* Screen Content */}
        <div className="h-full w-full overflow-hidden">
            {renderScreen()}
        </div>

        {/* Bottom Navigation (Only on Dashboard) */}
        {currentScreen === Screen.DASHBOARD && (
             <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 flex justify-around items-center pb-8 md:pb-6">
                <button className="flex flex-col items-center gap-1 text-slate-800">
                    <div className="w-12 h-1 bg-slate-800 rounded-full mb-1"></div>
                    <span className="text-[10px] font-bold">INÍCIO</span>
                </button>
             </div>
        )}
      </div>
    </div>
  );
};

export default App;
