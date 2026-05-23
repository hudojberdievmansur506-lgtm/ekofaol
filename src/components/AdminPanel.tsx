import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Image, 
  FileText, 
  Zap, 
  User, 
  Sparkles, 
  Check, 
  Bookmark, 
  RefreshCw, 
  HelpCircle,
  Lock,
  Unlock
} from 'lucide-react';
import { EcoActivity, GreenProject, ImageSlide } from '../types';
import { INITIAL_ECO_ACTIVITIES, GREEN_INSTITUTE_PROJECTS, ECO_TIPS } from '../data';

export default function AdminPanel() {
  const [activeSubTab, setActiveSubTab] = useState<'activities' | 'projects' | 'tips'>('activities');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('guldpi_admin_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Activities State
  const [activities, setActivities] = useState<EcoActivity[]>([]);
  // Projects State
  const [projects, setProjects] = useState<GreenProject[]>([]);
  // Tips State
  const [tips, setTips] = useState<{ title: string; description: string }[]>([]);

  // Feedback Messages
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Forms States - Activities
  const [actTitle, setActTitle] = useState('');
  const [actDescription, setActDescription] = useState('');
  const [actCategory, setActCategory] = useState<'planting' | 'recycling' | 'clean_up' | 'education' | 'other'>('planting');
  const [actStudentName, setActStudentName] = useState('');
  const [actFaculty, setActFaculty] = useState('');
  const [actImages, setActImages] = useState<string>(''); // comma separated URLs
  const [editingActId, setEditingActId] = useState<string | null>(null);

  // Forms States - Projects
  const [projTitle, setProjTitle] = useState('');
  const [projDescription, setProjDescription] = useState('');
  const [projCategory, setProjCategory] = useState<'energy' | 'water' | 'flora' | 'waste'>('energy');
  const [projHighlights, setProjHighlights] = useState(''); // semi-colon separated list
  const [projImages, setProjImages] = useState(''); // comma separated URLs
  const [editingProjId, setEditingProjId] = useState<string | null>(null);

  // Forms States - Tips
  const [tipTitle, setTipTitle] = useState('');
  const [tipDescription, setTipDescription] = useState('');
  const [editingTipIndex, setEditingTipIndex] = useState<number | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    // 1. Activities
    const savedActs = localStorage.getItem('guldpi_eco_activities_custom');
    if (savedActs) {
      try {
        setActivities(JSON.parse(savedActs));
      } catch (e) {
        setActivities([]);
      }
    } else {
      // populate with initial so it can be edited
      localStorage.setItem('guldpi_eco_activities_custom', JSON.stringify(INITIAL_ECO_ACTIVITIES));
      setActivities(INITIAL_ECO_ACTIVITIES);
    }

    // 2. Projects
    const savedProjs = localStorage.getItem('guldpi_green_projects_custom');
    if (savedProjs) {
      try {
        setProjects(JSON.parse(savedProjs));
      } catch (e) {
        setProjects([]);
      }
    } else {
      localStorage.setItem('guldpi_green_projects_custom', JSON.stringify(GREEN_INSTITUTE_PROJECTS));
      setProjects(GREEN_INSTITUTE_PROJECTS);
    }

    // 3. Tips
    const savedTips = localStorage.getItem('guldpi_eco_tips_custom');
    if (savedTips) {
      try {
        setTips(JSON.parse(savedTips));
      } catch (e) {
        setTips([]);
      }
    } else {
      localStorage.setItem('guldpi_eco_tips_custom', JSON.stringify(ECO_TIPS));
      setTips(ECO_TIPS);
    }
  }, []);

  const triggerMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Reset Storage to default
  const handleResetToDefaults = () => {
    if (window.confirm("Barcha ma'lumotlarni boshlang'ich holatiga qaytarishni xohlaysizmi? Siz kiritgan yangi ma'lumotlar o'chib ketadi.")) {
      localStorage.setItem('guldpi_eco_activities_custom', JSON.stringify(INITIAL_ECO_ACTIVITIES));
      localStorage.setItem('guldpi_green_projects_custom', JSON.stringify(GREEN_INSTITUTE_PROJECTS));
      localStorage.setItem('guldpi_eco_tips_custom', JSON.stringify(ECO_TIPS));
      
      setActivities(INITIAL_ECO_ACTIVITIES);
      setProjects(GREEN_INSTITUTE_PROJECTS);
      setTips(ECO_TIPS);
      triggerMessage("Ma'lumotlar asl holiga muvaffaqiyatli qaytarildi!", 'success');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'activities' | 'projects') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Display indicator
    triggerMessage("Rasmlar tayyorlanmoqda...", 'success');

    const fileList = Array.from(files) as File[];

    const promises = fileList.map(file => {
      return new Promise<string>((resolve, reject) => {
        // Safe check for size
        if (file.size > 2000000) {
          triggerMessage("Haddan tashqari katta rasm! Iltimos, 2MB dan kichikroq fayl tanlang.", 'error');
          reject(new Error("File too big"));
          return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(base64Urls => {
      if (target === 'activities') {
        const current = actImages ? actImages.split(',').map(u => u.trim()).filter(Boolean) : [];
        setActImages([...current, ...base64Urls].join(', '));
      } else {
        const current = projImages ? projImages.split(',').map(u => u.trim()).filter(Boolean) : [];
        setProjImages([...current, ...base64Urls].join(', '));
      }
      triggerMessage(`${files.length} ta yangi rasm yuklandi!`, 'success');
      e.target.value = ''; // Reset input
    }).catch(err => {
      console.warn("Rasm yuklashda xatolik yuz berdi:", err);
    });
  };

  const handleRemoveImage = (indexToRemove: number, target: 'activities' | 'projects') => {
    if (target === 'activities') {
      const current = actImages ? actImages.split(',').map(u => u.trim()).filter(Boolean) : [];
      const updated = current.filter((_, idx) => idx !== indexToRemove);
      setActImages(updated.join(', '));
    } else {
      const current = projImages ? projImages.split(',').map(u => u.trim()).filter(Boolean) : [];
      const updated = current.filter((_, idx) => idx !== indexToRemove);
      setProjImages(updated.join(', '));
    }
    triggerMessage("Rasm olib tashlandi", 'success');
  };

  // -----------------------------------------------------------------
  // ACTIVITIES CRUD
  // -----------------------------------------------------------------
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle || !actDescription) {
      triggerMessage("Iltimos, bacha majburiy maydonlarni to'ldiring", 'error');
      return;
    }

    const finalStudentName = actStudentName.trim() || 'GuldPI Jamoasi';
    const finalFaculty = actFaculty.trim() || 'Yashil Kampus';
    const finalCategory = actCategory || 'other';

    // Parse images CSV
    const parsedImages: ImageSlide[] = actImages
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0)
      .map(url => ({
        url,
        alt: actTitle
      }));

    // If no images provided, supply a nice default placeholder
    if (parsedImages.length === 0) {
      parsedImages.push({
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
        alt: actTitle
      });
    }

    let updatedList: EcoActivity[] = [];

    if (editingActId) {
      // Edit
      updatedList = activities.map(act => {
        if (act.id === editingActId) {
          return {
            ...act,
            title: actTitle,
            description: actDescription,
            category: finalCategory,
            studentName: finalStudentName,
            faculty: finalFaculty,
            images: parsedImages
          };
        }
        return act;
      });
      triggerMessage("Tashabbus muvaffaqiyatli yangilandi!", 'success');
    } else {
      // Add
      const newAct: EcoActivity = {
        id: `act-${Date.now()}`,
        title: actTitle,
        description: actDescription,
        category: finalCategory,
        studentName: finalStudentName,
        faculty: finalFaculty,
        date: new Date().toISOString().split('T')[0],
        images: parsedImages,
        likes: Math.floor(Math.random() * 20) + 5
      };
      updatedList = [newAct, ...activities];
      triggerMessage("Yangi tashabbus muvaffaqiyatli qo'shildi!", 'success');
    }

    localStorage.setItem('guldpi_eco_activities_custom', JSON.stringify(updatedList));
    setActivities(updatedList);

    // Reset Form
    setActTitle('');
    setActDescription('');
    setActStudentName('');
    setActFaculty('');
    setActImages('');
    setActCategory('planting');
    setEditingActId(null);
  };

  const handleEditActivity = (act: EcoActivity) => {
    setEditingActId(act.id);
    setActTitle(act.title);
    setActDescription(act.description);
    setActCategory(act.category);
    setActStudentName(act.studentName);
    setActFaculty(act.faculty);
    setActImages(act.images.map(img => img.url).join(', '));
  };

  const handleDeleteActivity = (id: string) => {
    if (window.confirm("Ushbu ekologik tashabbusni o'chirib tashlamoqchimisiz?")) {
      const updated = activities.filter(act => act.id !== id);
      localStorage.setItem('guldpi_eco_activities_custom', JSON.stringify(updated));
      setActivities(updated);
      triggerMessage("Tashabbus o'chirildi", 'success');
    }
  };

  // -----------------------------------------------------------------
  // PROJECTS CRUD
  // -----------------------------------------------------------------
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDescription) {
      triggerMessage("Iltimos, sarlavha va tavsif kiritishingiz zarur", 'error');
      return;
    }

    // Parse highlights
    const highlightsArray = projHighlights
      .split(';')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    // Parse images CSV
    const parsedImages: ImageSlide[] = projImages
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0)
      .map(url => ({
        url,
        alt: projTitle
      }));

    if (parsedImages.length === 0) {
      parsedImages.push({
        url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
        alt: projTitle
      });
    }

    let updatedList: GreenProject[] = [];

    if (editingProjId) {
      updatedList = projects.map(p => {
        if (p.id === editingProjId) {
          return {
            ...p,
            title: projTitle,
            description: projDescription,
            category: projCategory,
            highlights: highlightsArray,
            images: parsedImages
          };
        }
        return p;
      });
      triggerMessage("Institut loyihasi yangilandi!", 'success');
    } else {
      const newProj: GreenProject = {
        id: `proj-${Date.now()}`,
        title: projTitle,
        description: projDescription,
        category: projCategory,
        highlights: highlightsArray.length > 0 ? highlightsArray : ["Institut miqyosidagi yashil faollik", "Resurstejamkorlik yutuqlari"],
        metrics: [
          { label: 'Joriy natija', value: 'Faol', progress: 80 },
          { label: 'Energiya tejalishi', value: '45%', progress: 45 }
        ],
        images: parsedImages
      };
      updatedList = [...projects, newProj];
      triggerMessage("Yangi loyiha muvaffaqiyatli ro'yxatga olindi!", 'success');
    }

    localStorage.setItem('guldpi_green_projects_custom', JSON.stringify(updatedList));
    setProjects(updatedList);

    // Reset Form
    setProjTitle('');
    setProjDescription('');
    setProjCategory('energy');
    setProjHighlights('');
    setProjImages('');
    setEditingProjId(null);
  };

  const handleEditProject = (proj: GreenProject) => {
    setEditingProjId(proj.id);
    setProjTitle(proj.title);
    setProjDescription(proj.description);
    setProjCategory(proj.category);
    setProjHighlights(proj.highlights.join('; '));
    setProjImages(proj.images.map(img => img.url).join(', '));
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Ushbu yashil loyihani o'chirib tashlamoqchimisiz?")) {
      const updated = projects.filter(p => p.id !== id);
      localStorage.setItem('guldpi_green_projects_custom', JSON.stringify(updated));
      setProjects(updated);
      triggerMessage("Loyiha yo'q qilindi", 'success');
    }
  };

  // -----------------------------------------------------------------
  // TIPS CRUD
  // -----------------------------------------------------------------
  const handleSaveTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipTitle || !tipDescription) {
      triggerMessage("Maslahat sarlavhasi va tavsifini yozing", 'error');
      return;
    }

    let updatedList: { title: string; description: string }[] = [];

    if (editingTipIndex !== null) {
      updatedList = tips.map((t, idx) => {
        if (idx === editingTipIndex) {
          return { title: tipTitle, description: tipDescription };
        }
        return t;
      });
      triggerMessage("Eko-maslahat yangilandi!", 'success');
    } else {
      updatedList = [...tips, { title: tipTitle, description: tipDescription }];
      triggerMessage("Yangi eko-maslahat qo'shildi!", 'success');
    }

    localStorage.setItem('guldpi_eco_tips_custom', JSON.stringify(updatedList));
    setTips(updatedList);

    // Reset Form
    setTipTitle('');
    setTipDescription('');
    setEditingTipIndex(null);
  };

  const handleEditTip = (index: number) => {
    setEditingTipIndex(index);
    setTipTitle(tips[index].title);
    setTipDescription(tips[index].description);
  };

  const handleDeleteTip = (index: number) => {
    if (window.confirm("Ushbu eko-maslahatni o'chirmoqchimisiz?")) {
      const updated = tips.filter((_, idx) => idx !== index);
      localStorage.setItem('guldpi_eco_tips_custom', JSON.stringify(updated));
      setTips(updated);
      triggerMessage("Eko-maslahat o'chirildi", 'success');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'admin777') {
      setIsAuthenticated(true);
      localStorage.setItem('guldpi_admin_authenticated', 'true');
      setAuthError('');
      setPassword('');
      triggerMessage("Muvaffaqiyatli kirdingiz!", 'success');
    } else {
      setAuthError("Noto'g'ri parol kiritildi! Qaytadan urinib ko'ring.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('guldpi_admin_authenticated');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-stone-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
            <Lock size={24} className="stroke-[2.5]" />
          </div>
          <h3 className="text-lg font-black text-teal-950 tracking-tight">Xavfsiz Kirish</h3>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Boshqaruv paneliga kirish uchun himoya parolini kiriting
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
              Admin paroli
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError('');
              }}
              className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-center text-sm font-mono tracking-wider focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition"
              autoFocus
              required
            />
          </div>

          {authError && (
            <p className="text-xs font-semibold text-red-600 text-center bg-red-50 py-2 px-3 rounded-lg border border-red-100">
              {authError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-[0.98] transition duration-200 cursor-pointer"
          >
            Tasdiqlash
          </button>
        </form>

        <p className="text-[10px] text-center text-stone-400 font-mono">
          Guliston Davlat Pedagogika Instituti EkoPortal • 2026
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Compact Title Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-xl font-black text-teal-950 font-sans tracking-tight">
            GuldPI EkoPortal Boshqaruv Markazi
          </h2>
          <p className="text-xs text-stone-500">
            Tizim boshqaruv paneli (ADMIN) — Eko-tashabbuslar va loyihalar tahriri
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 text-[11px] font-bold tracking-wide transition-all cursor-pointer"
        >
          <Lock size={12} />
          Tizimdan chiqish
        </button>
      </div>

      {/* Floating Alerts */}
      {message && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-semibold transition-all duration-300 animate-bounce ${
          message.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          <Check size={16} className={message.type === 'success' ? 'text-emerald-600' : 'text-red-600'} />
          <span>{message.text}</span>
        </div>
      )}

      {/* Admin navigation tabs */}
      <div className="border-b border-stone-200">
        <div className="flex flex-wrap gap-2 md:gap-4 -mb-px">
          <button
            onClick={() => setActiveSubTab('activities')}
            className={`pb-4 px-4 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer select-none ${
              activeSubTab === 'activities'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            🌳 Talabalar Eko-tashabbuslari ({activities.length})
          </button>
          <button
            onClick={() => setActiveSubTab('projects')}
            className={`pb-4 px-4 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer select-none ${
              activeSubTab === 'projects'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            🔋 Institut Strategik Loyihalari ({projects.length})
          </button>
          <button
            onClick={() => setActiveSubTab('tips')}
            className={`pb-4 px-4 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer select-none ${
              activeSubTab === 'tips'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            📚 Eko-maslahatlar ({tips.length})
          </button>
        </div>
      </div>

      {/* Active management panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form Panel: col-span-5 */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-stone-150 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-lg font-bold text-teal-950 flex items-center gap-2">
              <Plus size={20} className="text-emerald-600" />
              {activeSubTab === 'activities' && (editingActId ? "Tashabbusni tahrirlash" : "Yangi tashabbus qo'shish")}
              {activeSubTab === 'projects' && (editingProjId ? "Loyihani tahrirlash" : "Yangi yashil loyiha qo'shish")}
              {activeSubTab === 'tips' && (editingTipIndex !== null ? "Maslahatni tahrirlash" : "Yangi maslahat qo'shish")}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Quyidagi maydonlarni to'ldiring va saqlash tugmasini bosing.
            </p>
          </div>

          {/* SUB-FORM: ACTIVITIES */}
          {activeSubTab === 'activities' && (
            <form onSubmit={handleSaveActivity} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase mb-1">
                  Eko-tashabbus sarlavhasi (Matn) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan, Oliy dargoh hovlisini yanada obodonlashtirish bo'yicha hashar o'tkazildi"
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase mb-1">
                  Loyihaning batafsil tavsifi (Katta matn) *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ushbu eko-aksiya qachon, qayerda va qanday natijalar bilan o'tkazilgani haqida batafsil ma'lumot qoldiring..."
                  value={actDescription}
                  onChange={(e) => setActDescription(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-stone-600 uppercase">
                    Rasm yuklash (Bir nechta tanlash mumkin)
                  </label>
                  <span className="text-[10px] text-emerald-600 font-bold font-mono">Haqiqiy rasm yuklash</span>
                </div>
                
                {/* Visual File Uploader Area */}
                <div className="relative border-2 border-dashed border-stone-200 hover:border-emerald-500 rounded-2xl p-4 transition-all bg-stone-50/50 hover:bg-emerald-50/10 text-center cursor-pointer group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'activities')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <Image className="text-stone-400 group-hover:text-emerald-600 transition" size={32} />
                    <p className="text-xs font-semibold text-stone-700">Rasmlarni shu yerga torting yoki bosing</p>
                    <p className="text-[10px] text-stone-400">Kamroq hajmli PNG, JPG formatlar (Maks. 2MB)</p>
                  </div>
                </div>

                {/* Uploaded Images Gallery Review */}
                {actImages.trim() ? (
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Yuklangan rasmlar ({actImages.split(',').filter(Boolean).length} ta):</p>
                    <div className="grid grid-cols-4 gap-2 animate-fade-in">
                      {actImages.split(',').map((url, idx) => {
                        const trimmedUrl = url.trim();
                        if (!trimmedUrl) return null;
                        const isBase64 = trimmedUrl.startsWith('data:');
                        return (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-stone-250 bg-stone-150 group">
                            <img 
                              src={trimmedUrl} 
                              alt={`Preview ${idx}`} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx, 'activities')}
                              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md transition duration-200 cursor-pointer z-10"
                              title="O'chirish"
                            >
                              <Trash2 size={10} />
                            </button>
                            <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded bg-black/60 text-[8px] text-white font-mono scale-90">
                              {isBase64 ? 'Fayl' : 'URL'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {/* Optional input for custom copy-pasted URLs fallback */}
                <details className="text-stone-400 text-[11px] group">
                  <summary className="cursor-pointer hover:text-stone-600 select-none">
                    Muqobil: Rasm URL manzillarini ko'rish/yozish
                  </summary>
                  <div className="mt-1">
                    <input
                      type="text"
                      placeholder="https://example.com/rasm1.jpg, https://example.com/rasm2.jpg"
                      value={actImages}
                      onChange={(e) => setActImages(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg text-xs font-mono focus:outline-none focus:border-emerald-600 mt-1"
                    />
                  </div>
                </details>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-750 text-white font-bold rounded-xl text-xs md:text-sm transition-all shadow-md cursor-pointer"
                >
                  <Save size={15} />
                  {editingActId ? "O'zgarishlarni saqlash" : "Tashabbusni e'lon qilish"}
                </button>
                {editingActId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingActId(null);
                      setActTitle('');
                      setActDescription('');
                      setActStudentName('');
                      setActFaculty('');
                      setActImages('');
                      setActCategory('planting');
                    }}
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs md:text-sm transition cursor-pointer"
                  >
                    Bekor qilish
                  </button>
                )}
              </div>
            </form>
          )}

          {/* SUB-FORM: PROJECTS */}
          {activeSubTab === 'projects' && (
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase mb-1">
                  Yashil loyiha nomi (Matn) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan, Institut Quyosh elektr energetika markazi"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase mb-1">
                  Loyiha haqida umumiy ma'lumot (Tavsif) *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Institutimizda muvaffaqiyatli joriy etilgan loyiha haqida batafsil yozib qoldiring..."
                  value={projDescription}
                  onChange={(e) => setProjDescription(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-stone-600 uppercase">
                    Loyiha rasmlarini yuklash (Carousel uchun bir nechta tanlash mumkin)
                  </label>
                  <span className="text-[10px] text-emerald-600 font-bold font-mono">Haqiqiy rasm yuklash</span>
                </div>
                
                {/* Visual File Uploader Area */}
                <div className="relative border-2 border-dashed border-stone-200 hover:border-emerald-500 rounded-2xl p-4 transition-all bg-stone-50/50 hover:bg-emerald-50/10 text-center cursor-pointer group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'projects')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <Image className="text-stone-400 group-hover:text-emerald-600 transition" size={32} />
                    <p className="text-xs font-semibold text-stone-700">Rasmlarni shu yerga torting yoki bosing</p>
                    <p className="text-[10px] text-stone-400">Kamroq hajmli PNG, JPG formatlar (Maks. 2MB)</p>
                  </div>
                </div>

                {/* Uploaded Images Gallery Review */}
                {projImages.trim() ? (
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Yuklangan rasmlar ({projImages.split(',').filter(Boolean).length} ta):</p>
                    <div className="grid grid-cols-4 gap-2 animate-fade-in">
                      {projImages.split(',').map((url, idx) => {
                        const trimmedUrl = url.trim();
                        if (!trimmedUrl) return null;
                        const isBase64 = trimmedUrl.startsWith('data:');
                        return (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-stone-250 bg-stone-150 group">
                            <img 
                              src={trimmedUrl} 
                              alt={`Project preview ${idx}`} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx, 'projects')}
                              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md transition duration-200 cursor-pointer z-10"
                              title="O'chirish"
                            >
                              <Trash2 size={10} />
                            </button>
                            <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded bg-black/60 text-[8px] text-white font-mono scale-90">
                              {isBase64 ? 'Fayl' : 'URL'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {/* Optional input for custom copy-pasted URLs fallback */}
                <details className="text-stone-400 text-[11px] group">
                  <summary className="cursor-pointer hover:text-stone-600 select-none">
                    Muqobil: Rasm URL-manzillarini ko'rish/yozish
                  </summary>
                  <div className="mt-1">
                    <input
                      type="text"
                      placeholder="https://example.com/panel_top.jpg, https://example.com/panel_close.jpg"
                      value={projImages}
                      onChange={(e) => setProjImages(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg text-xs font-mono focus:outline-none focus:border-emerald-600 mt-1"
                    />
                  </div>
                </details>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-750 text-white font-bold rounded-xl text-xs md:text-sm transition-all shadow-md cursor-pointer"
                >
                  <Save size={15} />
                  {editingProjId ? "Loyihani saqlash" : "Loyihani e'lon qilish"}
                </button>
                {editingProjId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProjId(null);
                      setProjTitle('');
                      setProjDescription('');
                      setProjCategory('energy');
                      setProjHighlights('');
                      setProjImages('');
                    }}
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs md:text-sm transition cursor-pointer"
                  >
                    Bekor
                  </button>
                )}
              </div>
            </form>
          )}

          {/* SUB-FORM: TIPS */}
          {activeSubTab === 'tips' && (
            <form onSubmit={handleSaveTip} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase mb-1">
                  Eko-maslahat Sarlavhasi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan, Qog'ozsiz ish joyi tizimi"
                  value={tipTitle}
                  onChange={(e) => setTipTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase mb-1">
                  Maslahat mazmuni (Kichik matn) *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Talabalar va xodimlar o'z kundalik hayotida qanday eko qoidaga rioya qilishlari kerakligini tushuntiring..."
                  value={tipDescription}
                  onChange={(e) => setTipDescription(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-750 text-white font-bold rounded-xl text-xs md:text-sm transition-all shadow-md cursor-pointer"
                >
                  <Save size={15} />
                  {editingTipIndex !== null ? "Saqlash" : "Maslahatni qo'shish"}
                </button>
                {editingTipIndex !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTipIndex(null);
                      setTipTitle('');
                      setTipDescription('');
                    }}
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs md:text-sm transition cursor-pointer"
                  >
                    Bekor
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Right Preview/List Panel: col-span-7 */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center border-b border-stone-200 pb-4">
            <h4 className="text-sm font-bold text-teal-950 uppercase tracking-widest font-mono flex items-center gap-2">
              <FileText size={16} className="text-emerald-600" />
              Mavjud asarlarning ro'yxati ({
                activeSubTab === 'activities' ? activities.length :
                activeSubTab === 'projects' ? projects.length :
                tips.length
              })
            </h4>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {/* ACTIVITIES LIST PREVIEW */}
            {activeSubTab === 'activities' && (
              activities.length === 0 ? (
                <p className="text-stone-500 text-xs italic text-center py-10 bg-white rounded-2xl border">Hozircha studentlar eko-faoliyati kiritilmagan.</p>
              ) : (
                activities.map((act) => (
                  <div key={act.id} className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-650/25 transition flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                          {act.category}
                        </span>
                        <span className="text-[9px] text-stone-400 font-mono">{act.date}</span>
                      </div>
                      <h5 className="font-bold text-xs sm:text-sm text-teal-980 line-clamp-1">{act.title}</h5>
                      <p className="text-[11px] text-stone-500 line-clamp-2">{act.description}</p>
                      
                      {act.images && act.images.length > 0 && (
                        <div className="flex gap-2 items-center flex-wrap pt-1">
                          <span className="text-[9px] text-stone-400 font-semibold flex items-center gap-1">
                            <Image size={10} />
                            Rasmlar soni: {act.images.length} ta
                          </span>
                          <div className="flex gap-1 overflow-x-auto max-w-xs shrink-0 py-0.5">
                            {act.images.map((img, idx) => (
                              <img key={idx} src={img.url} className="w-8 h-8 rounded object-cover border border-stone-200 shrink-0" alt="thumbnail" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleEditActivity(act)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition border border-stone-100 bg-stone-50/50 cursor-pointer"
                        title="Tahrirlash"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(act.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition border border-stone-100 bg-stone-50/50 cursor-pointer"
                        title="O'chirish"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )
            )}

            {/* PROJECTS LIST PREVIEW */}
            {activeSubTab === 'projects' && (
              projects.length === 0 ? (
                <p className="text-stone-500 text-xs italic text-center py-10 bg-white rounded-2xl border">Yashil loyihalar topilmadi.</p>
              ) : (
                projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-650/25 transition flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                          {proj.category}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs sm:text-sm text-teal-980 line-clamp-1">{proj.title}</h5>
                      <p className="text-[11px] text-stone-500 line-clamp-2">{proj.description}</p>
                      
                      {proj.highlights && proj.highlights.length > 0 && (
                        <div className="text-[10px] text-stone-400 space-y-0.5 pt-1">
                          <p className="font-semibold text-stone-600 text-[9px]">Yutuqlari:</p>
                          <ul className="list-disc list-inside">
                            {proj.highlights.slice(0, 2).map((h, i) => (
                              <li key={i} className="truncate">{h}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {proj.images && proj.images.length > 0 && (
                        <div className="flex gap-2 items-center flex-wrap pt-1">
                          <span className="text-[9px] text-stone-400 font-semibold flex items-center gap-1">
                            <Image size={10} />
                            Rasm galereyasi ({proj.images.length} ta)
                          </span>
                          <div className="flex gap-1 overflow-x-auto max-w-xs shrink-0 py-0.5">
                            {proj.images.map((img, idx) => (
                              <img key={idx} src={img.url} className="w-8 h-8 rounded object-cover border border-stone-200 shrink-0" alt="thumbnail" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition border border-stone-100 bg-stone-50/50 cursor-pointer"
                        title="Tahrirlash"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition border border-stone-100 bg-stone-50/50 cursor-pointer"
                        title="O'chirish"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )
            )}

            {/* TIPS LIST PREVIEW */}
            {activeSubTab === 'tips' && (
              tips.length === 0 ? (
                <p className="text-stone-500 text-xs italic text-center py-10 bg-white rounded-2xl border">Eko-maslahatlar topilmadi.</p>
              ) : (
                tips.map((tip, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-650/25 transition flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono tracking-wider font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800">
                          MASLAHAT-0{idx + 1}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs sm:text-sm text-teal-980">{tip.title}</h5>
                      <p className="text-[11px] text-stone-600 leading-relaxed">{tip.description}</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 shrink-0 self-center">
                      <button
                        onClick={() => handleEditTip(idx)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition border border-stone-100 bg-stone-50/50 cursor-pointer"
                        title="Tahrirlash"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteTip(idx)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition border border-stone-100 bg-stone-50/50 cursor-pointer"
                        title="O'chirish"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
