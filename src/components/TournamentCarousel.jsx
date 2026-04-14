import { useCallback, useEffect, useRef, useState } from "react";
import tournaments from "../data/tournaments";

const CARD_CONFIGS = [
  { w: 220, h: 190, z: 1, opacity: 0.5 },
  { w: 280, h: 220, z: 2, opacity: 0.75 },
  { w: 420, h: 300, z: 5, opacity: 1 },
  { w: 280, h: 220, z: 2, opacity: 0.75 },
  { w: 220, h: 190, z: 1, opacity: 0.5 },
];

const N = tournaments.length;
const extended = [...tournaments, ...tournaments, ...tournaments];

export default function TournamentCarousel() {
  const [index, setIndex] = useState(N);
  const [transitioning, setTransitioning] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const autoTimer = useRef(null);

  const stopAuto = useCallback(() => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    autoTimer.current = setInterval(() => {
      setTransitioning(true);
      setIndex((prev) => prev + 1);
    }, 3200);
  }, [stopAuto]);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  useEffect(() => {
    if (index >= N * 2) {
      setTimeout(() => {
        setTransitioning(false);
        setIndex(N);
      }, 600);
    }
    if (index < N) {
      setTimeout(() => {
        setTransitioning(false);
        setIndex(N * 2 - 1);
      }, 600);
    }
  }, [index]);

  const goTo = (nextIndex) => {
    setTransitioning(true);
    setIndex(nextIndex);
    startAuto();
  };

  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    stopAuto();
  };

  const handleEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX.current - endX;

    if (diff > 40) goTo(index + 1);
    else if (diff < -40) goTo(index - 1);
    else startAuto();
  };

  const dotIndex = ((index % N) + N) % N;
  const currentT = extended[index] || tournaments[0];
  const visibleCards = [];

  for (let d = -2; d <= 2; d += 1) {
    const i = index + d;
    if (i >= 0 && i < extended.length) visibleCards.push({ t: extended[i], dist: d, i });
  }

  return (
    <div
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      className="relative overflow-hidden rounded-[2rem] bg-slate-950/90 p-6 shadow-2xl ring-1 ring-white/10"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={currentT.image}
          alt="turf background"
          className="h-full w-full object-cover opacity-20 blur-2xl"
        />
      </div>

      <div className="relative flex items-center justify-center">
        {visibleCards.map(({ t, dist, i }) => {
          const cfg = CARD_CONFIGS[2 + dist];
          const isCenter = dist === 0;

          return (
            <div
              key={`${t.id}-${i}`}
              onClick={() => {
                if (dist === -1) goTo(index - 1);
                if (dist === 1) goTo(index + 1);
              }}
              className="group"
              style={{
                width: cfg.w,
                height: cfg.h,
                flexShrink: 0,
                marginLeft: dist === -1 ? -30 : 0,
                marginRight: dist === 1 ? -30 : 0,
                borderRadius: 24,
                overflow: "hidden",
                position: "relative",
                zIndex: cfg.z,
                opacity: cfg.opacity,
                transition: transitioning ? "all 0.6s cubic-bezier(0.4,0,0.2,1)" : "none",
                boxShadow: isCenter ? "0 25px 80px rgba(0,0,0,0.8)" : "0 10px 30px rgba(0,0,0,0.3)",
                cursor: dist === 0 ? "default" : "pointer",
              }}
            >
              <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="mb-3 inline-flex rounded-full bg-green-500/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-green-300">
                  {t.tag}
                </span>
                <div>
                  <h3 className={`font-semibold ${isCenter ? "text-2xl" : "text-sm"}`}>
                    {t.name}
                  </h3>
                  <p className={`mt-2 ${isCenter ? "text-sm" : "text-[11px] text-slate-200"}`}>{t.date} • {t.location}</p>
                </div>
                {isCenter && (
                  <a
                    href={`https://wa.me/916303480824?text=${encodeURIComponent(`Hi TurfKhelo, I want to join ${t.name} on ${t.date}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-3xl bg-green-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-400"
                  >
                    Join Now
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {tournaments.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(N + i)}
            className={`h-2 rounded-full transition ${dotIndex === i ? "w-8 bg-green-400" : "w-2 bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
