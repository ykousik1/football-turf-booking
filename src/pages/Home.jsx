import TournamentCarousel from "../components/TournamentCarousel";
import { turfs } from "../data/turfs";
import TurfCard from "../components/TurfCard";

export default function Home() {
  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">
          Book Your Turf Now ⚽
        </h1>
        <p className="mt-2 text-sm">
          Find nearby football turfs & join tournaments
        </p>
      </div>

      {/* Tournament Section */}
      <div>
        <h2 className="text-xl font-bold mb-3">🔥 Tournaments</h2>
        <TournamentCarousel />
      </div>

      {/* Turf Section */}
      <div>
        <h2 className="text-xl font-bold mb-3">🏟️ Featured Turfs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {turfs.map((t) => (
            <TurfCard key={t.id} turf={t} />
          ))}
        </div>
      </div>
    </div>
  );
}