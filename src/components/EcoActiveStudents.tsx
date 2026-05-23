import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Calendar,
  User,
  School,
  Sparkles
} from 'lucide-react';
import { EcoActivity } from '../types';
import { INITIAL_ECO_ACTIVITIES } from '../data';
import AutoCarousel from './AutoCarousel';

export default function EcoActiveStudents() {
  const [activities, setActivities] = useState<EcoActivity[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [likedList, setLikedList] = useState<string[]>([]);

  // Load merged activities
  useEffect(() => {
    const saved = localStorage.getItem('guldpi_eco_activities_custom');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setActivities(parsed);
      } catch (e) {
        setActivities(INITIAL_ECO_ACTIVITIES);
      }
    } else {
      setActivities(INITIAL_ECO_ACTIVITIES);
    }
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedList.includes(id)) {
      // Unlike
      setLikedList(likedList.filter((x) => x !== id));
      setLikesState((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) - 1,
      }));
    } else {
      // Like
      setLikedList([...likedList, id]);
      setLikesState((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));
    }
  };

  const filteredActivities = activities.filter((act) => {
    if (filter === 'all') return true;
    return act.category === filter;
  });

  return (
    <div className="space-y-12">
      {/* Intro Hero banner */}
      <div className="bg-linear-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-emerald-900">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-teal-100 to-transparent pointer-events-none" />
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles size={12} className="animate-pulse" />
            Faol Studentlar Jamiyati
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-sans">
            Bizning pedagogik talabalar — ekologik tashabbuslar yetakchilari
          </h2>
          <p className="text-stone-200 text-sm md:text-base leading-relaxed">
            Institutimizning koʻngilli yoshlari tomonidan amalga oshirilgan ekologik tadbirlar, "Yashil makon" hasharlari hamda muqobil tozalik aksiyalari hisobotlari jamlangan ochiq ma’lumotlar doskasi.
          </p>
        </div>
      </div>

      {/* Main activities display board */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Activities Feed */}
        <div className="space-y-8">
          {/* Activities List */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredActivities.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-stone-50 rounded-2xl p-10 text-center border text-stone-500"
                >
                  Bu boʻlim boʻyicha hozircha talabalar ishlari kiritilmagan.
                </motion.div>
              ) : (
                filteredActivities.map((act) => {
                  const currentLikes = (likesState[act.id] !== undefined) ? act.likes + likesState[act.id] : act.likes;
                  const isLiked = likedList.includes(act.id);

                  return (
                    <motion.article
                      key={act.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-3xl p-5 md:p-6 border border-emerald-950/10 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-5"
                    >
                      {/* Top Author Metadata - Author info removed as requested */}
                      <div className="flex justify-end items-center">
                        <span className="shrink-0 flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-stone-100 text-stone-600">
                          <Calendar size={12} />
                          {act.date}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2">
                        <h3 className="text-base md:text-lg font-bold text-teal-950 hover:text-emerald-700 transition">
                          {act.title}
                        </h3>
                        <p className="text-stone-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                          {act.description}
                        </p>
                      </div>

                      {/* Auto Sliding Images (Requiring 2 or 3 images automatic transition) */}
                      {act.images && act.images.length > 0 && (
                        <div className="relative overflow-hidden w-full">
                          <AutoCarousel images={act.images} aspectRatio="card" intervalMs={3000 + (Math.random() * 1000)} />
                        </div>
                      )}


                    </motion.article>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
