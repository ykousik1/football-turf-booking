import { useEffect, useState } from "react";
import { turfs as initialTurfs } from "../data/turfs";
import tournamentsData from "../data/tournaments";

const TURF_KEY = "turfkhelo-turfs";
const TOURNAMENT_KEY = "turfkhelo-tournaments";

export default function Admin() {
  const [turfs, setTurfs] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(900);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDate, setTournamentDate] = useState("");
  const [tournamentLocation, setTournamentLocation] = useState("");
  const [prize, setPrize] = useState("");

  useEffect(() => {
    const storedTurfs = JSON.parse(localStorage.getItem(TURF_KEY));
    const storedTournaments = JSON.parse(localStorage.getItem(TOURNAMENT_KEY));

    setTurfs(storedTurfs?.length ? storedTurfs : initialTurfs);
    setTournaments(storedTournaments?.length ? storedTournaments : tournamentsData);
  }, []);

  const persistTurfs = (next) => {
    setTurfs(next);
    localStorage.setItem(TURF_KEY, JSON.stringify(next));
  };

  const persistTournaments = (next) => {
    setTournaments(next);
    localStorage.setItem(TOURNAMENT_KEY, JSON.stringify(next));
  };

  const addTurf = () => {
    if (!name || !location || !image) {
      alert("Please enter name, location and image URL.");
      return;
    }

    const next = [
      ...turfs,
      {
        id: Date.now(),
        name,
        location,
        price: Number(price) || 900,
        image,
        description: description || "Modern turf with lights, clean washrooms and secure parking.",
        mapQuery: location,
        tags: ["Premium"],
      },
    ];

    persistTurfs(next);
    setName("");
    setLocation("");
    setPrice(900);
    setImage("");
    setDescription("");
  };

  const addTournament = () => {
    if (!tournamentName || !tournamentDate || !tournamentLocation) {
      alert("Please enter tournament details.");
      return;
    }

    const next = [
      ...tournaments,
      {
        id: Date.now(),
        name: tournamentName,
        date: tournamentDate,
        location: tournamentLocation,
        prize: prize || "₹5,000",
        image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
        tag: "Upcoming",
        description: "Open local tournament with fun prizes and evening matches.",
      },
    ];

    persistTournaments(next);
    setTournamentName("");
    setTournamentDate("");
    setTournamentLocation("");
    setPrize("");
  };

  return (
    <div className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <p className="mt-2 text-slate-400">Manage turf listings and tournaments from a lightweight local admin experience.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-white/10 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Add New Turf</h2>
              <div className="mt-6 space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Turf name"
                  className="w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none"
                />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none"
                />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price per hour"
                  className="w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none"
                />
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Image URL"
                  className="w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none"
                  rows={3}
                />
                <button
                  type="button"
                  onClick={addTurf}
                  className="w-full rounded-3xl bg-green-500 px-6 py-3 text-black font-semibold hover:bg-green-400"
                >
                  Add Turf
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-white/10 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Add Tournament</h2>
              <div className="mt-6 space-y-4">
                <input
                  value={tournamentName}
                  onChange={(e) => setTournamentName(e.target.value)}
                  placeholder="Tournament name"
                  className="w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none"
                />
                <input
                  value={tournamentDate}
                  onChange={(e) => setTournamentDate(e.target.value)}
                  placeholder="Date"
                  className="w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none"
                />
                <input
                  value={tournamentLocation}
                  onChange={(e) => setTournamentLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none"
                />
                <input
                  value={prize}
                  onChange={(e) => setPrize(e.target.value)}
                  placeholder="Prize pool"
                  className="w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none"
                />
                <button
                  type="button"
                  onClick={addTournament}
                  className="w-full rounded-3xl bg-green-500 px-6 py-3 text-black font-semibold hover:bg-green-400"
                >
                  Add Tournament
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-white/10 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Current Turf Listings</h2>
              <div className="mt-6 space-y-4">
                {turfs.map((turf) => (
                  <div key={turf.id} className="rounded-3xl bg-slate-900/90 p-4">
                    <h3 className="font-semibold text-white">{turf.name}</h3>
                    <p className="text-slate-400">{turf.location}</p>
                    <p className="mt-2 text-green-400">₹{turf.price}/hr</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-white/10 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Tournament Preview</h2>
              <div className="mt-6 space-y-4">
                {tournaments.map((item) => (
                  <div key={item.id} className="rounded-3xl bg-slate-900/90 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-slate-400">{item.location}</p>
                      </div>
                      <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-300">
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-slate-400">{item.date} • {item.prize}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
