import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import EcoActiveStudents from './components/EcoActiveStudents';
import GreenInstitute from './components/GreenInstitute';
import CarbonCalculator from './components/CarbonCalculator';
import AdminPanel from './components/AdminPanel';
import { Leaf } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'students' | 'institute' | 'admin'>('students');

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col font-sans selection:bg-emerald-150 selection:text-emerald-900">
      {/* Dynamic Navigation Header */}
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 space-y-16">
        
        {/* Route/Section transitions with Framer Motion */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {currentTab === 'students' ? (
              <motion.div
                key="students-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <EcoActiveStudents />
              </motion.div>
            ) : currentTab === 'institute' ? (
              <motion.div
                key="institute-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <GreenInstitute />
              </motion.div>
            ) : (
              <motion.div
                key="admin-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <AdminPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Action Widget: Student Footprint Calculator */}
        {currentTab !== 'admin' && (
          <div className="pt-8 border-t border-stone-200">
            <div className="max-w-xl mb-8 space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-teal-950 font-display">
                Ekologik Barkamollik va Amaliy Hisoblar
              </h2>
              <p className="text-stone-500 text-xs md:text-sm">
                Sizning kichik tashabbuslaringiz qanchalik muhimligini amaliy tarzda tekshirib koʻring
              </p>
            </div>
            <CarbonCalculator />
          </div>
        )}
      </main>

      {/* Institutional Green Footer */}
      <footer className="w-full bg-stone-950 text-white py-12 border-t border-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shrink-0">
              <Leaf size={16} />
            </div>
            <h3 className="text-sm md:text-base font-black tracking-widest uppercase text-white leading-tight">
              GULISTON DAVLAT PEDAGOGIKA INSTITUTI
            </h3>
          </div>
          <p className="text-[10px] text-stone-500 font-mono tracking-wider">
            © {new Date().getFullYear()} GULISTON DAVLAT PEDAGOGIKA INSTITUTI
          </p>
        </div>
      </footer>
    </div>
  );
}
