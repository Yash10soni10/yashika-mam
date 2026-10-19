/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChapterLastBite } from './components/ChapterLastBite';
import { ChapterOfficeJourney } from './components/ChapterOfficeJourney';
import { ChapterLetter } from './components/ChapterLetter';
import { MemoryGallery } from './components/MemoryGallery';
import { TimelineSection } from './components/TimelineSection';
import { BirthdayCakeSection } from './components/BirthdayCakeSection';
import { SecretEnvelopeModal } from './components/SecretEnvelopeModal';
import { InteractiveSurprises } from './components/InteractiveSurprises';
import { Footer } from './components/Footer';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [musicRequested, setMusicRequested] = useState(false);

  const handleStartExperience = () => {
    setIsUnlocked(true);
    setMusicRequested(true);
  };

  const handleOpenSurprise = () => {
    const celebrationEl = document.getElementById('chapter-celebration');
    if (celebrationEl) {
      celebrationEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsEnvelopeOpen(true);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#FAF9F8] text-[#1E293B] relative selection:bg-rose-100 selection:text-rose-700">
      {/* Top Bar Navigation */}
      <Navbar onOpenSurprise={handleOpenSurprise} musicAutoRequested={musicRequested} />

      {/* Main Experience Stream */}
      <main className="relative z-10 space-y-8 sm:space-y-12">
        {/* Prologue & Celestial Hero */}
        <HeroSection
          onStartExperience={handleStartExperience}
          isUnlocked={isUnlocked}
        />

        {/* Experience Chapters */}
        <div className={`transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-95'}`}>
          {/* Chapter 1: Food, Fights & Pure Love */}
          <ChapterLastBite />

          {/* Chapter 2: The Staircase & Office Journey */}
          <ChapterOfficeJourney />

          {/* Chapter 3: The Unspoken Confession Letter */}
          <ChapterLetter />

          {/* Chapter 4: Memory Gallery & All 15 Polaroids */}
          <MemoryGallery />

          {/* Chapter 5: Sibling Timeline */}
          <TimelineSection />

          {/* Chapter 6: Birthday Cake & Celebration */}
          <BirthdayCakeSection />
        </div>
      </main>

      {/* Secret Wax-Sealed Envelope Modal */}
      <SecretEnvelopeModal
        isOpen={isEnvelopeOpen}
        onClose={() => setIsEnvelopeOpen(false)}
      />

      {/* Floating Interactive Easter Eggs & Virtual Hug Bar */}
      <InteractiveSurprises />

      {/* Editorial Footer */}
      <Footer onOpenEnvelope={() => setIsEnvelopeOpen(true)} />
    </div>
  );
}
