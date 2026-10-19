import React, { useState } from 'react';
import { STORY_DATA } from '../data/storyContent';
import { Building2, Coffee, Heart, Eye } from 'lucide-react';
import staircaseImage from '../assets/images/staircase_office_memory_1792429309094.jpg';

export const ChapterOfficeJourney: React.FC = () => {
  const [activeStoryTab, setActiveStoryTab] = useState<'first' | 'stairs' | 'routine'>('stairs');

  return (
    <section id="chapter-office" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
      {/* Chapter Editorial Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <span>Chapter 02</span>
          <span aria-hidden="true">·</span>
          <span>Office Stairs & Unspoken Bonds</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans-main">
          {STORY_DATA.officeStaircase.title} 🏢✨
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-rose-600">
          {STORY_DATA.officeStaircase.subtitle}
        </p>
      </div>

      {/* Main 2-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Story Navigator */}
        <div className="lg:col-span-6 space-y-6">
          {/* Segmented Controls for Story Chapters */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-rose-100 shadow-xs text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveStoryTab('stairs')}
              className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer text-center ${
                activeStoryTab === 'stairs'
                  ? 'bg-rose-500 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sidhiyo Ka Nazara
            </button>
            <button
              type="button"
              onClick={() => setActiveStoryTab('first')}
              className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer text-center ${
                activeStoryTab === 'first'
                  ? 'bg-rose-500 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Wo Pehla Din
            </button>
            <button
              type="button"
              onClick={() => setActiveStoryTab('routine')}
              className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer text-center ${
                activeStoryTab === 'routine'
                  ? 'bg-rose-500 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Office Routine & Lunch
            </button>
          </div>

          {/* Active Story Card */}
          <div className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-rose-100 shadow-pearl space-y-4">
            {activeStoryTab === 'stairs' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  <span>The Staircase Viewpoint</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  “Aapko smile karta dekh main kitna khush ho jata tha…” 🥹
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans-main">
                  {STORY_DATA.officeStaircase.staircaseMoment}
                </p>
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-rose-700 italic font-handwriting text-xl">
                  “Pata hai Mam, subah office jaldi aane ka ek hi reason tha—aapse milna aur thoda waqt baat kar lena.” ❤️
                </div>
              </div>
            )}

            {activeStoryTab === 'first' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>The Very First Moment</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  “Kya hua, tum jyada bolte nahi ho kya?” 🫶🏻
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans-main">
                  {STORY_DATA.officeStaircase.firstMeeting}
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 text-amber-800 italic font-handwriting text-xl">
                  “Jis insaan ko maine socha tha ki koi aur honge, wahi insaan aaj meri sabse pyari didi ban chuki hain.” ✨
                </div>
              </div>
            )}

            {activeStoryTab === 'routine' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 text-pink-600 text-xs font-semibold uppercase tracking-wider">
                  <Coffee className="w-4 h-4" />
                  <span>Lunch Breaks & Shared Smiles</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  “Roz ka lunch, coffee break aur ghar drop karna…” 🚗
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans-main">
                  {STORY_DATA.officeStaircase.breaksComfort}
                </p>
                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-100 text-pink-800 italic font-handwriting text-xl">
                  “Chhote chhote moments kabhi chhote nahi hote Mamm. Yahi toh zindagi bhar yaad rehte hain.” 🥹🫶🏻
                </div>
              </div>
            )}
          </div>

          {/* Quick Sister Comfort Quote */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-100 text-xs text-slate-700 flex items-center gap-3">
            <Heart className="w-5 h-5 text-rose-500 shrink-0 fill-rose-500/20" />
            <span>
              “Main nahi janta aage kya hoga, lekin main hamesha aapse yahi wish karunga ki aapki smile kabhi kam na ho.”
            </span>
          </div>
        </div>

        {/* Right Column: Staircase Artwork */}
        <div className="lg:col-span-6 relative group rounded-3xl overflow-hidden border border-rose-100 bg-white shadow-pearl">
          <img
            src={staircaseImage}
            alt="Office staircase memory of Yashika Mamm and Yash"
            className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-500 group-hover:scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300 block mb-1">
              Morning Sunlight & Pure Joy
            </span>
            <p className="font-serif-display text-xl sm:text-2xl text-white font-medium italic">
              “Ek insaan ka paas hona hi kaafi hota hai poore din ko khoobsurat banane ke liye.”
            </p>
            <p className="text-xs text-slate-200 mt-1">— Yash</p>
          </div>
        </div>
      </div>
    </section>
  );
};
