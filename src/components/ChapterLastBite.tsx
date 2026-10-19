import React, { useState } from 'react';
import { STORY_DATA } from '../data/storyContent';
import { Utensils, Smile, Heart, Scissors, RefreshCw } from 'lucide-react';
import diningImage from '../assets/images/dining_last_bite_1792429307451.jpg';

export const ChapterLastBite: React.FC = () => {
  const [biteOwner, setBiteOwner] = useState<'both' | 'mamm' | 'yash'>('both');
  const [hairMessCount, setHairMessCount] = useState(0);
  const [fightState, setFightState] = useState<'normal' | 'angry' | 'laughing'>('normal');

  const hairReactions = [
    'Mamm! Baal abhi banaye the maine! 😂💇‍♂️',
    'Arey yaarrr! Phir se mera hairstyle kharab kar diya! 😭',
    'Chalo koi na, Mamm ka haq hai... baal kharab karne ka bhi! 🥺❤️',
    'Mamm, ab lag raha hoon na ekdum hero? 😂✨',
    'Unlimited laad-pyar unlocked! 🥹🫶🏻',
  ];

  const handleMessHair = () => {
    setHairMessCount((prev) => prev + 1);
  };

  return (
    <section id="chapter-fights" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
      {/* Chapter Editorial Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <span>Chapter 01</span>
          <span aria-hidden="true">·</span>
          <span>Food, Fights & Pure Love</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans-main">
          {STORY_DATA.lastBite.title} 🍜😂
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-rose-600">
          {STORY_DATA.lastBite.subtitle}
        </p>
      </div>

      {/* Main Grid: Visual Art + Interactive Bite Battle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Scene Visual */}
        <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden border border-rose-100 bg-white shadow-pearl">
          <img
            src={diningImage}
            alt="Yashika Mamm and Yash playfully fighting for the last bite"
            className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

          {/* Dialogue Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-rose-100 shadow-md space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold text-rose-600 shrink-0">Mamm:</span>
              <p className="text-xs sm:text-sm text-slate-800 italic font-sans-main">
                “{STORY_DATA.lastBite.dialogue.mamm}”
              </p>
            </div>
            <div className="flex items-start gap-2 pt-1 border-t border-rose-100">
              <span className="text-xs font-bold text-amber-600 shrink-0">Yash:</span>
              <p className="text-xs sm:text-sm text-slate-800 italic font-sans-main">
                “{STORY_DATA.lastBite.dialogue.yash}”
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Sibling Battle Simulator */}
        <div className="lg:col-span-5 space-y-6 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-rose-100 shadow-pearl">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
              Interactive Mini-Moment
            </span>
            <h3 className="text-xl font-bold text-slate-900">Who Gets The Last Bite? 🥟</h3>
            <p className="text-xs text-slate-500">
              Test the legendary sibling debate: Mamm ya Yash?
            </p>
          </div>

          {/* Bite Stage */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-center space-y-3">
            <div className="text-3xl animate-bounce">
              {biteOwner === 'both' ? '🥟🥢' : biteOwner === 'mamm' ? '😋👑' : '😜🏃‍♂️'}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              {biteOwner === 'both' && 'The last dumpling sits temptingly on the table... both eyes locked!'}
              {biteOwner === 'mamm' && 'Yash willingly gave the bite to Mamm: "Mamm aap meri favourite ho, aap hi khao!" ❤️'}
              {biteOwner === 'yash' && 'Yash tried to steal it back with a cheeky wink: "Mamm ek bite mera bhi toh banta hai! 😂"'}
            </p>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBiteOwner('mamm')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-500 text-white shadow-xs hover:bg-rose-600 transition-all cursor-pointer"
              >
                Give to Mamm 👑
              </button>
              <button
                type="button"
                onClick={() => setBiteOwner('yash')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-white shadow-xs hover:bg-amber-600 transition-all cursor-pointer"
              >
                Yash Steals It 😜
              </button>
              <button
                type="button"
                onClick={() => setBiteOwner('both')}
                className="p-1.5 text-xs text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                title="Reset"
                aria-label="Reset bite battle"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hair Messing Button */}
          <div className="pt-4 border-t border-rose-100 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-rose-500" />
                <span>Mamm Ka Favourite Shauk</span>
              </span>
              <span className="text-slate-500">Messed {hairMessCount} times</span>
            </div>

            <button
              type="button"
              onClick={handleMessHair}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:from-rose-600 hover:to-pink-700 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Mess Yash's Hair 😂💇‍♂️</span>
            </button>

            {hairMessCount > 0 && (
              <p className="text-xs text-rose-700 font-handwriting text-base text-center animate-fade-in bg-rose-50 py-1.5 px-3 rounded-xl border border-rose-200">
                {hairReactions[(hairMessCount - 1) % hairReactions.length]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Scene Two: The Cutest Fight Ever */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-pearl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block mb-1">
              Scene Two
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans-main">
              {STORY_DATA.cutestFight.title} 😤❤️
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Jab hum dono bina baat ke bhi lad padte hain!
            </p>
          </div>

          {/* Fight Simulator Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFightState('angry')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                fightState === 'angry'
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100/80'
              }`}
            >
              "Baat Nahi Kar Rahi!" 😤
            </button>
            <button
              type="button"
              onClick={() => setFightState('laughing')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                fightState === 'laughing'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100/80'
              }`}
            >
              Hansi Aagayi! 😂❤️
            </button>
          </div>
        </div>

        {/* Dynamic Fight Drama Visualisation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-5 rounded-2xl border transition-all ${
              fightState === 'angry'
                ? 'bg-red-50/70 border-red-200'
                : 'bg-rose-50/40 border-rose-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">👩‍💼</span>
              <span className="text-xs font-bold text-rose-600">Mamm:</span>
            </div>
            <p className="text-sm text-slate-800 italic font-sans-main">
              {fightState === 'angry'
                ? '“Main tumse baat nahi kar rahi Yash! Sar mat khao mera!”'
                : '“Yashhh, kitni nautanki karta hai tu… chal has mat ab!” 😂'}
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              fightState === 'angry'
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-amber-50/40 border-amber-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">👦</span>
              <span className="text-xs font-bold text-amber-700">Yash:</span>
            </div>
            <p className="text-sm text-slate-800 italic font-sans-main">
              {fightState === 'angry'
                ? '“THEEK HAI MAMM, MAIN BHI NAHI KAR RAHA!” (Chupke se dekh kar smile rokta hua)'
                : '“Sorry na Mamm… aap naraz hoti ho toh bilkul achha nahi lagta.” 🥺🫶🏻'}
            </p>
          </div>
        </div>

        {/* Sibling Quote */}
        <div className="text-center pt-2">
          <p className="font-handwriting text-xl sm:text-2xl text-rose-600">
            “{STORY_DATA.cutestFight.quote}”
          </p>
        </div>
      </div>
    </section>
  );
};
