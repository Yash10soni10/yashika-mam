import React, { useState } from 'react';
import { STORY_DATA } from '../data/storyContent';
import { Heart, Sparkles, X } from 'lucide-react';
import envelopeImage from '../assets/images/secret_envelope_night_1792429308384.jpg';

interface SecretEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretEnvelopeModal: React.FC<SecretEnvelopeModalProps> = ({ isOpen, onClose }) => {
  const [isUnsealed, setIsUnsealed] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-rose-100 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
          aria-label="Close envelope"
        >
          <X className="w-4 h-4" />
        </button>

        {!isUnsealed ? (
          /* Sealed State */
          <div className="text-center space-y-6 py-6">
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-rose-100 bg-rose-50/50 shadow-inner">
              <img
                src={envelopeImage}
                alt="Vintage glowing wax envelope for Yashika Mamm"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-rose-600 uppercase tracking-widest block">
                {STORY_DATA.secretLetter.teaser}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans-main">
                One Last Surprise For My Mamm 💌
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto font-sans-main">
                This is a quiet, personal letter kept locked until this exact moment. Click below to break the wax seal.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setIsUnsealed(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-100" />
                <span>{STORY_DATA.secretLetter.button}</span>
                <Heart className="w-4 h-4 text-rose-100 fill-rose-100 animate-pulse" />
              </button>
            </div>
          </div>
        ) : (
          /* Unsealed State */
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div className="flex items-center gap-2 text-xs text-rose-600 font-mono">
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>Wax Seal Broken · From Yash to Mamm</span>
              </div>
              <span className="text-xs text-slate-400">Private Keepsake</span>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 text-slate-700 leading-relaxed font-sans-main text-sm sm:text-base">
              {STORY_DATA.secretLetter.content.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Climax Quote Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-200/80 text-center space-y-2">
              <p className="font-serif-display text-xl sm:text-2xl text-slate-900 font-semibold">
                “{STORY_DATA.secretLetter.finalQuote}”
              </p>
              <p className="font-handwriting text-2xl text-rose-600">
                {STORY_DATA.secretLetter.finalSubtitle}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="font-handwriting text-2xl text-rose-600">Aapka Chhota Bhai, Yash ❤️</span>
              <button
                type="button"
                onClick={() => setIsUnsealed(false)}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Fold Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
