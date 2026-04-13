import { useEffect, useRef, useState, useCallback } from "react";

// 🔥 REAL DATA (no gradients)
const tournaments = [
  {
    name: "Sunday League",
    date: "Apr 20, 2026",
    prize: "₹10,000",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
  },
  {
    name: "5v5 Knockout",
    date: "Apr 25, 2026",
    prize: "₹5,000",
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a",
  },
  {
    name: "Night League",
    date: "Apr 28, 2026",
    prize: "₹8,000",
    image: "https://images.unsplash.com/photo-1495555687392-1e4d4f6cfa5f",
  },
  {
    name: "Weekend Cup",
    date: "Apr 30, 2026",
    prize: "₹6,000",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
  },
  {
    name: "Champions Cup",
    date: "May 2, 2026",
    prize: "₹12,000",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
  },
];

// 🔥 UI CONFIG (same logic, bigger sizes)
const CARD_CONFIGS = [
  { w: 220, h: 190, z: 1, opacity: 0.5 },
  { w: 280, h: 220, z: 2, opacity: 0.75 },
  { w: 420, h: 300, z: 5, opacity: 1 }, // center
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

  // 🔁 AUTO SLIDE
  const startAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setTransitioning(true);
      setIndex((prev) => prev + 1);
    }, 2800);
  }, []);

  const stopAuto = useCallback(() => clearInterval(autoTimer.current), []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  // 🔁 INFINITE LOOP RESET
  useEffect(() => {
    if (index >= N * 2) {
      setTimeout(() => {
        setTransitioning(false);
        setIndex(N);
      }, 650);
    }
    if (index < N) {
      setTimeout(() => {
        setTransitioning(false);
        setIndex(N * 2 - 1);
      }, 650);
    }
  }, [index]);

  const goTo = (i) => {
    setTransitioning(true);
    setIndex(i);
    startAuto();
  };

  // 👆 DRAG SUPPORT
  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    stopAuto();
  };

  const handleEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;

    const diff = startX.current - endX;

    if (diff > 40) goTo(index + 1);
    else if (diff < -40) goTo(index - 1);
    else startAuto();
  };

  const dotIndex = index % N;
  const currentT = extended[index];

  // 🎯 VISIBLE 5 CARDS
  const visibleCards = [];
  for (let d = -2; d <= 2; d++) {
    const i = index + d;
    if (i >= 0 && i < extended.length)
      visibleCards.push({ t: extended[i], dist: d, i });
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "3rem 0",
        userSelect: "none",
        minHeight: 420,
      }}
    >
      {/* 🌫️ BACKGROUND BLUR */}
      <img
        src={currentT.image}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(80px)",
          opacity: 0.25,
          transform: "scale(1.3)",
        }}
      />

      {/* CARDS */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
        }}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
      >
        {visibleCards.map(({ t, dist, i }) => {
          const cfg = CARD_CONFIGS[2 + dist];
          const isCenter = dist === 0;

          const marginLeft = dist === -1 ? -30 : 0;
          const marginRight = dist === 1 ? -30 : 0;

          return (
            <div
              key={i}
              onClick={() => {
                if (dist === -1) goTo(index - 1);
                if (dist === 1) goTo(index + 1);
              }}
              style={{
                width: cfg.w,
                height: cfg.h,
                flexShrink: 0,
                marginLeft,
                marginRight,
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                zIndex: cfg.z,
                opacity: cfg.opacity,
                transition: transitioning
                  ? "all 0.6s cubic-bezier(0.4,0,0.2,1)"
                  : "none",
                boxShadow: isCenter
                  ? "0 25px 80px rgba(0,0,0,0.8)"
                  : "0 6px 20px rgba(0,0,0,0.3)",
                outline: isCenter ? "2px solid #22c55e" : "none",
              }}
            >
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* TEXT OVERLAY */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  padding: isCenter ? 20 : 12,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  color: "#fff",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: isCenter ? 20 : 13,
                    fontWeight: isCenter ? 600 : 400,
                  }}
                >
                  {t.name}
                </h2>

                <p style={{ margin: "4px 0", fontSize: isCenter ? 14 : 11 }}>
                  {t.date}
                </p>

                <p style={{ color: "#4ade80", fontSize: isCenter ? 15 : 12 }}>
                  {t.prize}
                </p>

                {isCenter && (
                  <button
                    style={{
                      marginTop: 12,
                      background: "#22c55e",
                      border: "none",
                      color: "#fff",
                      padding: "10px 0",
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                  >
                    Join Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* DOTS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 20,
        }}
      >
        {tournaments.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(N + i)}
            style={{
              width: i === dotIndex ? 20 : 6,
              height: 6,
              borderRadius: i === dotIndex ? 3 : "50%",
              background:
                i === dotIndex ? "#22c55e" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}