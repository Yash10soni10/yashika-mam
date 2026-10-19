import React, { useState } from 'react';
import { Heart, Star, Cookie } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveSurprises: React.FC = () => {
  const [hugCount, setHugCount] = useState(1000000);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showEasterEgg = (message: string) => {
    setActiveToast(message);
    setTimeout(() => {
      setActiveToast((current) => (current === message ? null : current));
    }, 4000);
  };

  const handleSendHug = () => {
    setHugCount((prev) => prev + 1);
    try {
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { y: 0.9, x: 0.9 },
        colors: ['#F43F5E', '#FB7185', '#FDA4AF', '#FBBF24'],
      });
    } catch {}
    showEasterEgg('Bonus hug delivered to Mamm! Approximately 1,000,000+ warm sibling hugs sent. 🫂❤️');
  };

  return (
    <>
      {/* Floating Bottom Action Strip */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Active Toast Notification */}
        {activeToast && (
          <div className="bg-white/95 backdrop-blur-md border border-rose-200 text-xs text-rose-700 px-4 py-2.5 rounded-2xl shadow-xl max-w-xs animate-bounce font-sans-main">
            {activeToast}
          </div>
        )}

        {/* Surprise Icons Bar */}
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-rose-100 shadow-pearl">
          {/* Secret Heart */}
          <button
            type="button"
            onClick={() => showEasterEgg('Psst… Mamm, aap bahut special ho. ❤️')}
            className="p-2 rounded-full hover:bg-rose-50 text-rose-500 transition-colors cursor-pointer"
            title="A secret for Mamm"
            aria-label="Secret heart easter egg"
          >
            <Heart className="w-4 h-4 fill-rose-500/20" />
          </button>

          {/* Shooting Star */}
          <button
            type="button"
            onClick={() =>
              showEasterEgg('A wish for my favourite person: endless happiness, good health, and peace. ✨')
            }
            className="p-2 rounded-full hover:bg-amber-50 text-amber-500 transition-colors cursor-pointer"
            title="Shooting star wish"
            aria-label="Shooting star easter egg"
          >
            <Star className="w-4 h-4 fill-amber-500/20" />
          </button>

          {/* Food Bite Joke */}
          <button
            type="button"
            onClick={() => showEasterEgg('Mamm, last bite abhi bhi meri hai! Deal is a deal! 😂🍜')}
            className="p-2 rounded-full hover:bg-orange-50 text-orange-500 transition-colors cursor-pointer"
            title="Last bite reminder"
            aria-label="Food bite easter egg"
          >
            <Cookie className="w-4 h-4" />
          </button>

          {/* Virtual Hug Counter Button */}
          <button
            type="button"
            onClick={handleSendHug}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full hover:from-rose-600 hover:to-pink-700 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Hug ({hugCount.toLocaleString()})</span>
          </button>
        </div>
      </div>
    </>
  );
};
