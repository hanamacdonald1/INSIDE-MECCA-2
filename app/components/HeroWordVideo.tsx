"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Film, 
  Smartphone, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Sliders
} from "lucide-react";

interface HeroWordVideoProps {
  headlineText?: string;
  subheadText?: string;
}

const DEFAULT_HEADLINE = "Worked at MECCA? Tell me what happened.";

export function HeroWordVideo({
  headlineText = DEFAULT_HEADLINE,
  subheadText = "Inside MECCA independently examines employee experiences, workplace practices and company commitments."
}: HeroWordVideoProps) {
  const words = React.useMemo(() => headlineText.split(/\s+/).filter(Boolean), [headlineText]);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(-1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [videoTheme, setVideoTheme] = useState<"editorial" | "noir" | "cinematic">("editorial");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play subtle sound tick on word transitions if sound enabled
  const playWordTick = useCallback((index: number) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const pitch = 220 + index * 40;
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio context might fail on un-interacted browser sessions
    }
  }, [soundEnabled]);

  // Word video animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalTime = Math.max(350 / playbackSpeed, 150);

    timerRef.current = setInterval(() => {
      setActiveWordIndex((prev) => {
        const next = prev + 1;
        if (next >= words.length) {
          playWordTick(0);
          return 0;
        }
        playWordTick(next);
        return next;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, playWordTick, words.length]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (activeWordIndex >= words.length - 1 || activeWordIndex === -1) {
        setActiveWordIndex(0);
        playWordTick(0);
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveWordIndex(-1);
  };

  // Background visual themes for kinetic typography canvas
  const themeClasses = {
    editorial: "bg-[#0f0e0d] text-[#f7f5f1] border-stone-800",
    noir: "bg-[#000000] text-[#ffffff] border-zinc-900",
    cinematic: "bg-gradient-to-br from-[#1a0a0c] via-[#0d0d0f] to-[#141210] text-[#fff] border-red-950/60"
  }[videoTheme];

  return (
    <div className="w-full my-3">
      {/* Visual Video Container */}
      <div 
        className={`relative overflow-hidden rounded-xl border transition-all duration-500 shadow-xl ${themeClasses} ${
          aspectRatio === "9:16" ? "max-w-sm mx-auto aspect-[9/16]" : "w-full aspect-[16/9] sm:min-h-[360px]"
        }`}
      >
        {/* Ambient background particles & grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#b42025_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Subtle glowing vignette */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#b42025]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#b42025]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge Bar */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/10 backdrop-blur-md bg-black/30">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[#b42025] text-white">
              <Film className="w-3 h-3" />
              Word Video
            </span>
            <span className="text-[11px] font-mono text-stone-400 hidden sm:inline-block">
              Kinetic Motion
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Aspect Ratio Switcher */}
            <div className="flex items-center bg-white/10 p-0.5 rounded border border-white/10">
              <button
                type="button"
                onClick={() => setAspectRatio("16:9")}
                className={`px-2 py-1 rounded text-xs font-mono font-semibold flex items-center gap-1 transition-colors ${
                  aspectRatio === "16:9" ? "bg-[#b42025] text-white" : "text-stone-300 hover:text-white"
                }`}
                title="16:9 Landscape"
                aria-label="16:9 Landscape"
              >
                <Monitor className="w-3 h-3" />
                <span className="hidden sm:inline">16:9</span>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio("9:16")}
                className={`px-2 py-1 rounded text-xs font-mono font-semibold flex items-center gap-1 transition-colors ${
                  aspectRatio === "9:16" ? "bg-[#b42025] text-white" : "text-stone-300 hover:text-white"
                }`}
                title="9:16 Portrait"
                aria-label="9:16 Portrait"
              >
                <Smartphone className="w-3 h-3" />
                <span className="hidden sm:inline">9:16</span>
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded transition-colors ${soundEnabled ? "bg-white/20 text-white" : "text-stone-400 hover:text-white"}`}
              title={soundEnabled ? "Mute audio cues" : "Enable audio cues"}
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 text-stone-400 hover:text-white rounded transition-colors"
              title="Video Settings"
              aria-label="Video Settings"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Settings Tray */}
        {showSettings && (
          <div className="relative z-20 px-4 py-2.5 bg-black/80 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-mono">Speed:</span>
              {[0.75, 1, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 rounded font-mono ${
                    playbackSpeed === spd ? "bg-[#b42025] text-white font-bold" : "bg-white/10 text-stone-300 hover:bg-white/20"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-mono">Theme:</span>
              {(["editorial", "noir", "cinematic"] as const).map((thm) => (
                <button
                  key={thm}
                  type="button"
                  onClick={() => setVideoTheme(thm)}
                  className={`px-2 py-0.5 rounded capitalize ${
                    videoTheme === thm ? "bg-white text-black font-bold" : "bg-white/10 text-stone-300 hover:bg-white/20"
                  }`}
                >
                  {thm}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Center Stage: Kinetic Typography Word Stream */}
        <div className="relative z-10 w-full h-[calc(100%-110px)] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-3xl space-y-4">
            {/* Kicker subtitle in video */}
            <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#b42025] uppercase font-bold opacity-90 transition-opacity">
              • INSIDE MECCA INVESTIGATION •
            </p>

            {/* Main Animated Headline Words with H1 Accessible Semantics */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.15] text-balance">
              {words.map((word, idx) => {
                const isActive = activeWordIndex === idx;
                const isPassed = activeWordIndex > idx;

                return (
                  <span
                    key={`${word}-${idx}`}
                    className={`inline-block mx-1 sm:mx-1.5 transition-all duration-300 transform ${
                      isActive
                        ? "text-[#b42025] scale-110 sm:scale-115 font-extrabold underline decoration-white/30 decoration-2 underline-offset-8 drop-shadow-[0_0_20px_rgba(180,32,37,0.8)]"
                        : isPassed
                        ? "text-white opacity-95"
                        : activeWordIndex === -1
                        ? "text-white opacity-100"
                        : "text-stone-500 opacity-40 blur-[0.3px]"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>

            {/* Video Subhead Reel Text */}
            <p className="text-xs sm:text-sm md:text-base text-stone-300 max-w-xl mx-auto line-clamp-2 leading-relaxed opacity-80 pt-2 font-sans">
              {subheadText}
            </p>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 px-4 py-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2">
          {/* Progress track */}
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden cursor-pointer">
            <div 
              className="bg-[#b42025] h-full transition-all duration-150"
              style={{
                width: `${
                  activeWordIndex === -1
                    ? 0
                    : ((activeWordIndex + 1) / words.length) * 100
                }%`
              }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            {/* Play/Pause & Reset */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#b42025] hover:bg-[#8e171b] text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                title={isPlaying ? "Pause word video" : "Play word video"}
                aria-label={isPlaying ? "Pause word video" : "Play word video"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 text-stone-400 hover:text-white rounded transition-colors"
                title="Restart word animation"
                aria-label="Restart word animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <span className="text-[11px] font-mono text-stone-400 ml-1">
                {activeWordIndex >= 0 ? `00:0${Math.min(activeWordIndex + 1, 9)} / 00:0${words.length}` : "00:00 / 00:07"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
              <span>{playbackSpeed}x speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
