import { Link } from "react-router-dom";
import TournamentCarousel from "../components/TournamentCarousel";
import { turfs } from "../data/turfs";
import TurfCard from "../components/TurfCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#040a10] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[2rem] bg-slate-950/90 p-8 shadow-2xl ring-1 ring-white/10">
            <span className="inline-flex rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-300">
              Launching in India
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Book the best football turfs in seconds.
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">
              Discover local turfs, check availability, and confirm your booking with WhatsApp — no complicated checkout or login required.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/turfs"
                className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
              >
                Book Your Turf Now
              </Link>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-green-400 hover:text-green-300"
              >
                Contact Support
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-green-300">WhatsApp booking</p>
                <p className="mt-3 text-lg text-slate-200">Send a message with your slot, date and name instantly.</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-green-300">Tournament showcase</p>
                <p className="mt-3 text-lg text-slate-200">Auto sliding banners for local football tournaments and weekend leagues.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-[#0c171f] to-[#071114] p-8 shadow-2xl ring-1 ring-white/10">
            <h2 className="text-xl font-semibold tracking-tight text-white">Ready to play?</h2>
            <p className="mt-3 text-slate-400">
              Explore top turfs with fast booking, price tags, and nearby venues built for players in India.
            </p>

            <div className="mt-8 space-y-4">
              {turfs.slice(0, 3).map((turf) => (
                <div key={turf.id} className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{turf.name}</h3>
                      <p className="text-sm text-slate-400">{turf.location}</p>
                    </div>
                    <p className="text-lg font-bold text-green-400">₹{turf.price}/hr</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white">🔥 Tournament Showcase</h2>
            <p className="mt-2 text-slate-400">Auto-scrolling banners with live, upcoming and featured football tournaments.</p>
          </div>
          <TournamentCarousel />
        </section>

        <section className="mt-14">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">🏟️ Featured Turfs</h2>
              <p className="mt-2 text-slate-400">Handpicked turf venues with real booking links and fast slot discovery.</p>
            </div>
            <Link to="/turfs" className="text-sm font-semibold text-green-400 hover:text-green-300">
              View all turfs →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {turfs.slice(0, 3).map((turf) => (
              <TurfCard key={turf.id} turf={turf} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
