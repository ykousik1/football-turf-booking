import { useMemo, useState } from "react";
import TurfCard from "../components/TurfCard";
import { turfs as turfList } from "../data/turfs";

export default function Turfs() {
  const [location, setLocation] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1500);

  const locations = ["All", ...Array.from(new Set(turfList.map((turf) => turf.location)))];
  const tags = ["All", "Budget", "Premium", "Night"];

  const filtered = useMemo(() => {
    return turfList.filter((turf) => {
      const priceMatch = turf.price <= maxPrice;
      const locationMatch = location === "All" || turf.location === location;
      const tagMatch = selectedTag === "All" || turf.tags?.includes(selectedTag);
      return priceMatch && locationMatch && tagMatch;
    });
  }, [location, maxPrice, selectedTag]);

  return (
    <div className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Discover football turfs</h1>
            <p className="mt-2 text-slate-400">Browse venues, check prices and start your WhatsApp booking instantly.</p>
          </div>
          <div className="rounded-full bg-slate-900/80 px-5 py-3 text-sm text-slate-300 ring-1 ring-white/10">
            {filtered.length} turfs found
          </div>
        </div>

        <div className="mb-8 grid gap-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Location</label>
            <select
              className="w-full rounded-2xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none focus:border-green-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Max price</label>
            <input
              type="range"
              min="500"
              max="2500"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-green-400"
            />
            <div className="text-sm text-slate-400">Up to ₹{maxPrice}/hr</div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Type</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    selectedTag === tag
                      ? "bg-green-500 text-black"
                      : "bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.length ? (
            filtered.map((turf) => <TurfCard key={turf.id} turf={turf} />)
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-10 text-center text-slate-300">
              No turfs match your filters. Try a different location or price range.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
