import React from 'react';
import { AudioPlayer } from './AudioPlayer';
import { Sparkles, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenSurprise: () => void;
  musicAutoRequested?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSurprise, musicAutoRequested }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-rose-100/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="font-serif-display italic text-rose-500 text-xl font-normal">For</span>
          <span>Yashika Mamm</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline-block animate-pulse" />
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
          <a href="#prologue" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Our Universe
          </a>
          <a href="#chapter-fights" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Food & Fights
          </a>
          <a href="#chapter-office" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Office Story
          </a>
          <a href="#chapter-letter" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Heartfelt Letter
          </a>
          <a href="#chapter-gallery" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            15 Memories
          </a>
          <a href="#chapter-celebration" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Birthday Cake
          </a>
        </nav>

        {/* Zone 3: 1 primary action + audio */}
        <div className="flex items-center gap-3 shrink-0">
          <AudioPlayer autoPlayRequest={musicAutoRequested} />
          <button
            type="button"
            onClick={onOpenSurprise}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg shadow-sm hover:from-rose-600 hover:to-pink-700 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surprise Mamm</span>
          </button>
        </div>
      </div>
    </header>
  );
};
