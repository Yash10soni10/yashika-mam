import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';

interface FooterProps {
  onOpenEnvelope: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnvelope }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-rose-100 bg-[#FFFDFD] py-14 px-4 sm:px-6 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left: Dedication */}
        <div className="space-y-1.5">
          <p className="font-serif-display text-lg text-slate-900 font-semibold">
            For My Yashika Mamm ❤️
          </p>
          <p className="text-xs text-slate-500 font-sans-main">
            Handcrafted with love, memories, and gratitude by your chhota bhai, Yash.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-[11px] text-rose-600 font-mono pt-1">
            <span>19 October 2026</span>
            <span aria-hidden="true">·</span>
            <span>Happy Birthday, Meri Pyaari Didi</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenEnvelope}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-rose-600" />
            <span>Open Secret Letter</span>
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer shadow-xs"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
