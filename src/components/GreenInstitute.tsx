import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle,
  Lightbulb,
  BookmarkCheck,
  Zap
} from 'lucide-react';
import { GREEN_INSTITUTE_PROJECTS, INSTITUT_ECO_STATS, ECO_TIPS } from '../data';
import { GreenProject } from '../types';
import AutoCarousel from './AutoCarousel';

export default function GreenInstitute() {
  const [projects, setProjects] = useState<GreenProject[]>([]);
  const [tips, setTips] = useState<{ title: string; description: string }[]>([]);

  useEffect(() => {
    // Load projects
    const savedProjs = localStorage.getItem('guldpi_green_projects_custom');
    if (savedProjs) {
      try {
        setProjects(JSON.parse(savedProjs));
      } catch (e) {
        setProjects(GREEN_INSTITUTE_PROJECTS);
      }
    } else {
      setProjects(GREEN_INSTITUTE_PROJECTS);
    }

    // Load tips
    const savedTips = localStorage.getItem('guldpi_eco_tips_custom');
    if (savedTips) {
      try {
        setTips(JSON.parse(savedTips));
      } catch (e) {
        setTips(ECO_TIPS);
      }
    } else {
      setTips(ECO_TIPS);
    }
  }, []);

  return (
    <div className="space-y-12">
      {/* Green Institute Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-linear-to-r from-teal-900 to-emerald-950 border border-teal-800 text-white p-8 md:p-12">
        <div className="absolute right-0 top-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-teal-300 via-emerald-600 to-transparent pointer-events-none" />
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/40 border border-emerald-400/30 text-emerald-300 text-xs font-mono uppercase tracking-wider">
            <Zap size={12} className="animate-pulse" />
            STRATEGIK EKO-LOYIHALAR
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-sans">
            GuldPI — Barqaror taraqqiyot va yashil kampus tashabbusi
          </h2>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed">
            Guliston davlat pedagogika institutida energiya samaradorligi, "smart" sugʻorish tizimlari, botanika florasi hamda qayta tiklanuvchi energiya manbalaridan foydalanish loyihalari talabalar va oʻqituvchilar ekotizimi uchun xizmat qilmoqda.
          </p>
        </div>
      </div>

      {/* Dynamic Statistics Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        {INSTITUT_ECO_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="bg-stone-50 p-5 rounded-2xl border border-stone-150 hover:border-emerald-600/30 hover:bg-emerald-50/10 transition-all duration-300 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded">
                GuldPI Koʻrsatkichi
              </span>
              <p className="text-2xl md:text-3xl font-extrabold font-mono text-teal-950">
                {stat.value}
              </p>
              <h4 className="text-xs font-bold text-stone-700 leading-snug">
                {stat.label}
              </h4>
            </div>
            <p className="text-[10px] text-stone-400 pt-3 mt-3 border-t border-stone-200">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Pillars Section containing auto-sliding image groups */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest">
              Asosiy boʻlimlar
            </span>
            <h3 className="text-lg md:text-2xl font-bold text-teal-950 tracking-tight">
              Yashil tizimlar va texnologiyalar
            </h3>
          </div>
        </div>

        {/* Projects Pillars List. For each, images cycle automatically! */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl overflow-hidden border border-emerald-950/10 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image carousel block (left col) - occupying 5 of 12 columns */}
              <div className="lg:col-span-5 p-4 lg:p-6 flex flex-col justify-center bg-stone-50 border-r border-stone-100">
                {/* 2 or 3 images with Auto Carousel cycling automatically */}
                <AutoCarousel images={proj.images} aspectRatio="card" intervalMs={4000} />
                <p className="text-[11px] text-stone-400 font-mono text-center mt-3 flex items-center justify-center gap-1">
                  <BookmarkCheck size={11} className="text-emerald-600" />
                  Galereya avtomatik ravishda almashadi
                </p>
              </div>

              {/* Data content block (right col) - occupying 7 of 12 columns */}
              <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-mono font-semibold bg-emerald-50 text-emerald-805">
                      {proj.category === 'energy' && 'MUQOBIL ENERGETIKA'}
                      {proj.category === 'flora' && 'YASHIL OʻSIMLIKZORLAR'}
                      {proj.category === 'water' && 'SUV VA RESURSLAR'}
                      {proj.category === 'waste' && 'CHIQINDILAR TIZIMI'}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-2xl font-bold text-teal-950 capitalize">
                    {proj.title}
                  </h3>

                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                    {proj.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-teal-900 tracking-wider uppercase font-mono">
                      Loyihaning asosiy yutuqlari:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                      {proj.highlights && proj.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle size={14} className="text-emerald-505 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainable Pedagogical tips slider/tips for future schoolteachers */}
      <div className="bg-emerald-50/40 p-6 md:p-8 rounded-3xl border border-emerald-900/10 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-800">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base md:text-lg text-teal-950">
              Eko-maslahatlar: Boʻlajak oʻqituvchilarga tavsiyalar
            </h3>
            <p className="text-xs text-stone-500">
              Ushbu qoidalarni institutimizda hamda dars beradigan maktablaringizda tadbiq eting
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-150 relative overflow-hidden group hover:border-emerald-500/20 shadow-xs">
              <span className="absolute right-3 top-3 font-mono text-3xl font-extrabold text-emerald-100 select-none group-hover:text-emerald-200/50 transition duration-300">
                0{idx + 1}
              </span>
              <div className="relative z-10 space-y-1.5">
                <h4 className="font-bold text-sm text-teal-950 pr-8">
                  {tip.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
