import React, { useState } from 'react';
import { STORY_DATA } from '../data/storyContent';
import { ThreeUniverseCanvas } from './ThreeUniverseCanvas';
import { Sparkles, Heart, ChevronDown, Compass } from 'lucide-react';
import heroImage from '../assets/images/mamm_universe_hero_1792429306865.jpg';

interface HeroSectionProps {
  onStartExperience: () => void;
  isUnlocked: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartExperience, isUnlocked }) => {
  const [show3dCanvas, setShow3dCanvas] = useState(false);

  return (
    <section id="prologue" className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12 overflow-hidden bg-gradient-to-b from-[#FFFDFD] via-[#FAF9F8] to-[#FFF5F7]">
      {/* Soft Rose & Gold Ambient Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-100/30 rounded-full blur-2xl pointer-events-none" />

      {/* Hero Container */}
      <div className="max-w-5xl w-full mx-auto text-center space-y-8 relative z-10">
        {/* Editorial Subtitle Kicker */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-rose-700 font-medium bg-rose-50/80 px-4 py-1.5 rounded-full border border-rose-100/80 shadow-xs">
          <span className="font-handwriting text-lg text-rose-600">19 October 2026</span>
          <span aria-hidden="true" className="text-rose-300">·</span>
          <span>A Pure White & Rose Universe Crafted For Mamm</span>
          <span aria-hidden="true" className="text-rose-300">·</span>
          <span className="text-pink-600 font-semibold">Chhota Bhai Yash</span>
        </div>

        {/* Cinematic Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight font-sans-main text-balance">
            {STORY_DATA.hero.title}
          </h1>
          <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 tracking-wide">
            {STORY_DATA.hero.subtitle}
          </p>
        </div>

        {/* Poetic Intro Block on Frosted White */}
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-rose-100/80 shadow-pearl space-y-3">
          {STORY_DATA.hero.introLines.map((line, index) => (
            <p
              key={index}
              className={`text-sm sm:text-base leading-relaxed ${
                index % 2 === 1 ? 'font-semibold text-rose-700' : 'text-slate-600 font-light'
              }`}
            >
              {line}
            </p>
          ))}

          <div className="pt-4 border-t border-rose-100/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="text-slate-900 font-semibold">{STORY_DATA.hero.dedication}</span>
            <span aria-hidden="true">·</span>
            <span>{STORY_DATA.hero.subDedication}</span>
          </div>
        </div>

        {/* Action Button: Unlock / Start Journey */}
        {!isUnlocked ? (
          <div className="pt-2 animate-bounce">
            <button
              type="button"
              onClick={onStartExperience}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 rounded-xl shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-100" />
              <span>{STORY_DATA.hero.cta}</span>
              <Heart className="w-4 h-4 text-rose-100 fill-rose-100 animate-pulse" />
            </button>
            <p className="text-xs text-slate-500 mt-2">Mamm, click kijiye aur apni pyaari si duniya mein enter kariye ✨</p>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {/* 3D Simulation or Cinematic Art Viewer */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShow3dCanvas(false)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  !show3dCanvas
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/80 border border-slate-200/60'
                }`}
              >
                Cinematic Art Scene
              </button>
              <button
                type="button"
                onClick={() => setShow3dCanvas(true)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  show3dCanvas
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/80 border border-slate-200/60'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-rose-500" />
                <span>Interactive 3D Constellation</span>
              </button>
            </div>

            {/* Visual Container */}
            {show3dCanvas ? (
              <ThreeUniverseCanvas />
            ) : (
              <div className="relative rounded-3xl overflow-hidden border border-rose-100 shadow-pearl group bg-white">
                <img
                  src={heroImage}
                  alt="Yashika Mamm and Yash gazing at the starry galaxy universe"
                  className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-left max-w-xl text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-300 block mb-1">
                    Our Little World
                  </span>
                  <p className="font-handwriting text-2xl sm:text-3xl text-white drop-shadow-md">
                    “Mamm, aapke saath meri chhoti si duniya thodi aur achhi lagti hai.” 🥹❤️
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1">
                    Har kisi ki life mein koi na koi special hota hai… par meri life mein Mamm hain.
                  </p>
                </div>
              </div>
            )}

            {/* Scroll Down Indicator */}
            <div className="pt-4 flex flex-col items-center gap-1.5 text-xs text-slate-500">
              <span>Scroll down to explore our story</span>
              <a href="#chapter-fights" className="p-1 hover:text-rose-600 transition-colors" aria-label="Scroll to Chapter 1">
                <ChevronDown className="w-4 h-4 animate-bounce text-rose-500" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
