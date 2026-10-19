import React from 'react';
import { TIMELINE_MILESTONES } from '../data/storyContent';
import { Sparkles, Coffee, Flame, Heart, Smile, Star } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'coffee':
        return <Coffee className="w-4 h-4 text-rose-500" />;
      case 'flame':
        return <Flame className="w-4 h-4 text-orange-500" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-pink-500 fill-pink-500/20" />;
      case 'smile':
        return <Smile className="w-4 h-4 text-emerald-600" />;
      case 'star':
        return <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />;
      default:
        return <Sparkles className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
      {/* Chapter Editorial Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-600 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <span>Chapter 05</span>
          <span aria-hidden="true">·</span>
          <span>Timeline Of Little Things</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans-main">
          Little Moments, Infinite Love ⏳✨
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-rose-600">
          Chhoti-chhoti baatein. Ek bahut pyaara rishta. ❤️
        </p>
      </div>

      {/* Vertical Celestial Timeline */}
      <div className="relative border-l-2 border-rose-200 ml-4 sm:ml-32 space-y-12">
        {TIMELINE_MILESTONES.map((milestone, idx) => (
          <div key={milestone.id} className="relative pl-6 sm:pl-10 group">
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-rose-300 flex items-center justify-center group-hover:border-rose-500 group-hover:scale-110 transition-all shadow-sm">
              {getIcon(milestone.iconName)}
            </div>

            {/* Time period floating on the left (desktop) */}
            <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
              <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider block">
                {milestone.period}
              </span>
              <span className="text-[11px] text-rose-600 font-semibold">
                Milestone 0{idx + 1}
              </span>
            </div>

            {/* Milestone Card Content on White Pearl */}
            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-rose-100/90 group-hover:border-rose-300 transition-all shadow-pearl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="sm:hidden text-xs font-mono text-rose-600 font-medium">
                  {milestone.period}
                </span>
                <span className="text-[11px] font-semibold text-slate-600 bg-rose-50/80 px-2.5 py-0.5 rounded-md border border-rose-100">
                  {milestone.tag}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans-main">
                {milestone.title}
              </h3>

              <p className="font-handwriting text-xl text-rose-600">
                “{milestone.hinglishHeadline}”
              </p>

              <p className="text-sm text-slate-700 leading-relaxed font-sans-main">
                {milestone.story}
              </p>

              <div className="pt-2 border-t border-rose-100">
                <p className="text-xs text-amber-700 italic font-medium">
                  {milestone.quote}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
