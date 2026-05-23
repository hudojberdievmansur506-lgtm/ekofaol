import { Leaf, Award, Compass, Sparkles } from 'lucide-react';
import React from 'react';

interface HeaderProps {
  currentTab: 'students' | 'institute';
  onTabChange: (tab: 'students' | 'institute') => void;
}

export default function Header({ currentTab, onTabChange }: HeaderProps) {
  return (
    <header className="w-full bg-linear-to-b from-stone-50 to-white/95 border-b border-emerald-950/10 sticky top-0 z-40 backdrop-blur-md">
      {/* Top micro bar for university context */}
      <div className="w-full bg-gradient-to-r from-emerald-900 to-teal-950 text-white py-1.5 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono font-medium gap-1 select-none">
        <span className="flex items-center gap-1.5 uppercase tracking-wide tracking-tight">
          <Sparkles size={12} className="text-emerald-400 animate-pulse" />
          GULISTON DAVLAT PEDAGOGIKA INSTITUTI
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo / Branding */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-12 h-12 bg-linear-to-tr from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-emerald-200 shadow-md">
            <Leaf className="w-6 h-6 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-teal-950 tracking-tight flex items-center gap-1">
              GulDPI <span className="text-emerald-600 font-medium font-sans">EkoPortal</span>
            </h1>
            <p className="text-xs text-stone-500 font-sans tracking-tight">
              Yashil makon va ekologik barqarorlik platformasi
            </p>
          </div>
        </div>

        {/* Primary Navigation Toggle */}
        <div className="bg-stone-100/80 border border-emerald-950/5 p-1 rounded-xl flex gap-1 shadow-inner max-w-sm w-full sm:w-auto">
          <button
            onClick={() => onTabChange('students')}
            id="tab-students-toggle"
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 select-none cursor-pointer ${
              currentTab === 'students'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100 scale-102 font-semibold'
                : 'text-stone-600 hover:text-emerald-700 hover:bg-white/50'
            }`}
          >
            <Award size={16} />
            Ekofaol talabalar
          </button>
          <button
            onClick={() => onTabChange('institute')}
            id="tab-institute-toggle"
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 select-none cursor-pointer ${
              currentTab === 'institute'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100 scale-102 font-semibold'
                : 'text-stone-600 hover:text-emerald-700 hover:bg-white/50'
            }`}
          >
            <Compass size={16} />
            Yashil institut
          </button>
        </div>
      </div>
    </header>
  );
}
