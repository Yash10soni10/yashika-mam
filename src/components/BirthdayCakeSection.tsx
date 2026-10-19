import React, { useState } from 'react';
import { STORY_DATA } from '../data/storyContent';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Gift, Star, RefreshCw } from 'lucide-react';
import whiteCakeGardenImage from '../assets/images/white_garden_cake_1792430282797.jpg';

export const BirthdayCakeSection: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [activeWishIndex, setActiveWishIndex] = useState(0);

  const wishes = STORY_DATA.birthdayWish.wishes;

  const triggerCelebration = () => {
    setCandlesLit(false);
    setWishMade(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#FB7185', '#FBBF24', '#F472B6', '#E0E7FF'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#FFB6C1', '#FFD700', '#F43F5E'],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#FFB6C1', '#FFD700', '#F43F5E'],
        });
      }, 350);
    } catch {}
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section id="chapter-celebration" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
      {/* Chapter Editorial Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <Gift className="w-3.5 h-3.5" />
          <span>Chapter 06</span>
          <span aria-hidden="true">·</span>
          <span>Grand Birthday Celebration</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight font-sans-main text-balance">
          {STORY_DATA.birthdayWish.mainHeading}
        </h2>
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-600">
          {STORY_DATA.birthdayWish.subHeading}
        </p>
      </div>

      {/* Main Feature: Sunlit White & Pastel Garden Birthday Cake */}
      <div className="relative rounded-3xl overflow-hidden border border-rose-100 bg-white shadow-pearl group">
        <img
          src={whiteCakeGardenImage}
          alt="Sunlit white garden birthday cake celebration for Yashika Mamm"
          className="w-full h-[400px] sm:h-[500px] lg:h-[560px] object-cover transition-transform duration-700 group-hover:scale-102"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Floating Celebration Card Over Image */}
        <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 flex items-center justify-center md:justify-start gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Interactive Cake Ceremony</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans-main">
              {wishMade ? 'Wish Granted to Yashika Mamm! ✨🎉' : 'Make a Birthday Wish, Mamm! 🎂'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-sans-main">
              {wishMade
                ? 'Candles blown, universe brightened! May every single wish in your pure heart come true, Mamm. ❤️'
                : 'Candles are glowing bright with warm prayers from your chhota bhai Yash. Click below to make a wish and blow the candles!'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {candlesLit ? (
              <button
                type="button"
                onClick={triggerCelebration}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-200 fill-amber-200 animate-pulse" />
                <span>Blow Candles & Make Wish ✨</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRelight}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer border border-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Relight Candles 🕯️</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sequential Heartfelt Wishes Cards on White */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 font-sans-main flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Wishes From Yash's Heart</span>
          </h3>
          <div className="flex items-center gap-1.5">
            {wishes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveWishIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeWishIndex === i ? 'bg-rose-500 w-6' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Wish ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-pearl space-y-4">
          <div className="text-xs font-mono text-rose-600 font-semibold uppercase tracking-wider">
            Birthday Blessing 0{activeWishIndex + 1}
          </div>

          <p className="font-serif-display text-xl sm:text-2xl text-slate-900 font-medium italic">
            “{wishes[activeWishIndex].en}”
          </p>

          <p className="font-handwriting text-2xl sm:text-3xl text-rose-600">
            {wishes[activeWishIndex].hi}
          </p>

          <div className="pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
            <span>Always wishing the absolute best for you, Mamm.</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveWishIndex((prev) => (prev > 0 ? prev - 1 : wishes.length - 1))
                }
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveWishIndex((prev) => (prev < wishes.length - 1 ? prev + 1 : 0))
                }
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
              >
                Next Wish
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
