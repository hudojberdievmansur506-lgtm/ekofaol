import { useState } from 'react';
import { Leaf, Award, Compass, Calculator, Flame, Trees, HelpCircle } from 'lucide-react';

export default function CarbonCalculator() {
  const [paper, setPaper] = useState<number>(20); // A4 sheets saved per week
  const [bottles, setBottles] = useState<number>(5); // bottles recycled per week
  const [treesPlanted, setTreesPlanted] = useState<number>(2); // trees planted
  const [walking, setWalking] = useState<number>(10); // km walked per week instead of driving

  // Calculations (CO2 saving per year in kg)
  // 1 A4 sheet = ~0.005 kg of CO2 during production, plus tree equivalent. (8,333 sheets = 1 pine tree)
  const paperCo2Saved = paper * 52 * 0.005; // annual
  const paperTreesEquivalent = (paper * 52) / 8333;

  // 1 plastic bottle recycled save ~0.084 kg of CO2
  const bottlesCo2Saved = bottles * 52 * 0.084;

  // 1 tree absorbs ~22 kg of CO2 per year
  const treesCo2Saved = treesPlanted * 22;

  // 1 km walking replaces 1 km car = ~0.12 kg of CO2 saved
  const walkingCo2Saved = walking * 52 * 0.12;

  const totalCo2Saved = paperCo2Saved + bottlesCo2Saved + treesCo2Saved + walkingCo2Saved;
  const equivalentPhonesCharged = totalCo2Saved * 121; // ~121 smartphone charges per kg of CO2 saved
  const virtualForest = treesPlanted + paperTreesEquivalent;

  return (
    <div id="eco-action-calculator" className="bg-gradient-to-br from-stone-50 to-emerald-50/40 rounded-3xl p-6 md:p-8 border border-emerald-950/10 shadow-lg">
      <div className="flex items-center gap-3 mb-6 select-none">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-teal-950 tracking-tight">
            Shaxsiy talaba eko-kalkulyatori
          </h3>
          <p className="text-xs text-stone-500 font-sans">
            Kundalik oʻzgarishlaringiz yiliga qancha yashillik olib kelishini hisoblang
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Area */}
        <div className="lg:col-span-7 space-y-6">
          {/* Paper Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                📝 Haftalik tejalgan A4 qogʻoz
              </span>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                {paper} dona
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={paper}
              onChange={(e) => setPaper(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>0 dona</span>
              <span>150 dona</span>
            </div>
          </div>

          {/* Bottles Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                🧴 Saralangan plastik shishalar (haftalik)
              </span>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                {bottles} dona
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={bottles}
              onChange={(e) => setBottles(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>0 dona</span>
              <span>50 dona</span>
            </div>
          </div>

          {/* Trees Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                🌳 Ekilgan va barqaror oʻsayotgan koʻchatlar
              </span>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                {treesPlanted} tup
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={treesPlanted}
              onChange={(e) => setTreesPlanted(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>0 tup</span>
              <span>20 tup</span>
            </div>
          </div>

          {/* Walking Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                🚶 Piyoda yoki velosipedda yurish (haftalik)
              </span>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                {walking} km
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              value={walking}
              onChange={(e) => setWalking(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>0 km</span>
              <span>80 km</span>
            </div>
          </div>
        </div>

        {/* Output Results Area */}
        <div className="lg:col-span-5 bg-teal-950 text-white p-6 rounded-2xl flex flex-col justify-between h-full shadow-md border border-teal-800">
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase font-mono mb-4">
              Yillik ekologik samaradorlik
            </h4>

            {/* Total CO2 Saved */}
            <div className="mb-6">
              <p className="text-stone-300 text-xs">Atrof-muhitga asrab qolingan CO₂</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
                  {totalCo2Saved.toFixed(1)}
                </span>
                <span className="text-emerald-400 font-semibold text-sm">kg CO₂ / yil</span>
              </div>
            </div>

            {/* Stats list */}
            <div className="space-y-4 border-t border-teal-800/80 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-900 flex items-center justify-center text-emerald-400">
                  <Trees className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-stone-300">Asrab qolingan virtual daraxtlar</p>
                  <p className="text-sm font-semibold font-mono text-white">
                    {virtualForest.toFixed(2)} ta daraxt
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-900 flex items-center justify-center text-emerald-400">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-stone-300">Smartfon toʻliq quvvatlanish ekvivalenti</p>
                  <p className="text-sm font-semibold font-mono text-white">
                    {Math.round(equivalentPhonesCharged).toLocaleString('uz-UZ')} marta
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-teal-850 text-xs text-stone-400 italic">
            * Hisob-kitoblar xalqaro ekologik mezonlar va pedagogika instituti talabalari ehtiyojlariga muvofiq hisoblangan.
          </div>
        </div>
      </div>
    </div>
  );
}
