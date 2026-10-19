import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayRequest?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayRequest }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const melodyNotes = [
    { freq: 261.63, dur: 0.6 }, // C4
    { freq: 329.63, dur: 0.6 }, // E4
    { freq: 392.00, dur: 0.8 }, // G4
    { freq: 440.00, dur: 0.8 }, // A4
    { freq: 523.25, dur: 1.2 }, // C5
    { freq: 440.00, dur: 0.6 }, // A4
    { freq: 392.00, dur: 0.8 }, // G4
    { freq: 329.63, dur: 1.0 }, // E4
    { freq: 293.66, dur: 0.6 }, // D4
    { freq: 349.23, dur: 0.6 }, // F4
    { freq: 440.00, dur: 0.8 }, // A4
    { freq: 523.25, dur: 1.4 }, // C5
    { freq: 587.33, dur: 0.8 }, // D5
    { freq: 523.25, dur: 0.8 }, // C5
    { freq: 392.00, dur: 1.2 }, // G4
    { freq: 329.63, dur: 1.6 }, // E4
  ];

  let noteIndex = 0;

  const playNote = (ctx: AudioContext, masterGain: GainNode, freq: number, duration: number) => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      const osc2 = ctx.createOscillator();
      const noteGain2 = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.18, now + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noteGain2.gain.setValueAtTime(0, now);
      noteGain2.gain.linearRampToValueAtTime(0.04, now + 0.04);
      noteGain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc.connect(noteGain);
      osc2.connect(noteGain2);
      noteGain.connect(masterGain);
      noteGain2.connect(masterGain);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration + 0.1);
      osc2.stop(now + duration + 0.1);
    } catch {}
  };

  const startMusic = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      setIsPlaying(true);

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = window.setInterval(() => {
        if (!ctx || ctx.state === 'suspended') return;
        const note = melodyNotes[noteIndex % melodyNotes.length];
        playNote(ctx, masterGain, note.freq, note.dur);
        noteIndex++;
      }, 750);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    if (autoPlayRequest && !isPlaying) {
      startMusic();
    }
  }, [autoPlayRequest]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-rose-100 rounded-full px-3 py-1.5 text-xs text-slate-700 shadow-sm">
      <button
        type="button"
        onClick={toggleMusic}
        className="flex items-center gap-1.5 font-medium hover:text-rose-600 transition-colors cursor-pointer"
        title={isPlaying ? 'Pause music' : 'Play peaceful melody'}
        aria-label="Toggle soothing background music"
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <Volume2 className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[11px] tracking-wide text-rose-700 font-semibold">Playing Melodies</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] tracking-wide text-slate-600">Play Music 🎵</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-rose-100">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-14 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            aria-label="Music volume"
          />
        </div>
      )}
    </div>
  );
};
