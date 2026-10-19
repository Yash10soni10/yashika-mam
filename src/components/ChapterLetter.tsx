import React, { useState } from 'react';
import { STORY_DATA } from '../data/storyContent';
import { Heart, Feather, ArrowDown } from 'lucide-react';

export const ChapterLetter: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const paragraphs = STORY_DATA.letter.paragraphs;

  const handleReadMore = () => {
    if (visibleCount < paragraphs.length) {
      setVisibleCount((prev) => Math.min(prev + 2, paragraphs.length));
    }
  };

  return (
    <section id="chapter-letter" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Chapter Editorial Header */}
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <Feather className="w-3.5 h-3.5" />
          <span>Chapter 03</span>
          <span aria-hidden="true">·</span>
          <span>Emotional Center</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans-main">
          {STORY_DATA.letter.title} ❤️
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-rose-600">
          {STORY_DATA.letter.subtitle}
        </p>
      </div>

      {/* Pristine Ivory Parchment Letter Box */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-rose-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-pearl space-y-6">
        {/* Subtle decorative stamp */}
        <div className="flex items-center justify-between pb-6 border-b border-rose-100">
          <div className="flex items-center gap-2 text-xs text-rose-600 font-mono">
            <span>Special Delivery</span>
            <span aria-hidden="true">·</span>
            <span>19 October 2026</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer underline underline-offset-4"
            >
              {showAll ? 'Show Paced View' : 'Read Full Letter Instantly'}
            </button>
          </div>
        </div>

        {/* Letter Body Paragraphs */}
        <div className="space-y-6 text-slate-700 leading-relaxed font-sans-main text-sm sm:text-base">
          {(showAll ? paragraphs : paragraphs.slice(0, visibleCount)).map((para, index) => {
            const isClosing = index === paragraphs.length - 1 || index === paragraphs.length - 2;
            return (
              <p
                key={index}
                className={`${
                  isClosing
                    ? 'font-handwriting text-xl sm:text-2xl text-rose-600 pt-4'
                    : 'text-slate-700'
                } leading-relaxed`}
              >
                {para}
              </p>
            );
          })}
        </div>

        {/* Pacing Controller */}
        {!showAll && visibleCount < paragraphs.length && (
          <div className="pt-6 text-center border-t border-rose-100">
            <button
              type="button"
              onClick={handleReadMore}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Continue Reading…</span>
              <ArrowDown className="w-3.5 h-3.5 text-rose-300" />
            </button>
          </div>
        )}

        {/* Letter Footnote */}
        <div className="pt-8 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Har lafz dil se likha hua hai, Mamm ke liye.</span>
          </div>
          <span className="font-handwriting text-2xl text-rose-600">Aapka Chhota Bhai, Yash</span>
        </div>
      </div>
    </section>
  );
};
