import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { turfs } from "../data/turfs";

const slots = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

export default function TurfDetails() {
  const { id } = useParams();
  const turf = useMemo(
    () => turfs.find((item) => String(item.id) === id),
    [id]
  );

  const [selectedSlot, setSelectedSlot] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  const handleBooking = () => {
    if (!name || !date || !selectedSlot) {
      alert("Please select your name, date and slot before booking.");
      return;
    }

    const message = `Hi TurfKhelo team, I want to book ${turf.name} on ${date} at ${selectedSlot}. Name: ${name}`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!turf) {
    return (
      <div className="min-h-screen bg-[#030608] p-6 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-950/90 p-8 text-center ring-1 ring-white/10">
          <h1 className="text-3xl font-bold">Turf not found</h1>
          <p className="mt-3 text-slate-400">Please return to the turf listing to select a valid venue.</p>
          <Link to="/turfs" className="mt-6 inline-flex rounded-full bg-green-500 px-6 py-3 text-black">
            View Turfs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link to="/turfs" className="text-sm text-green-400 hover:text-green-300">
            ← Back to turf list
          </Link>
          <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm text-green-300">Fast WhatsApp booking</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] bg-slate-950/90 shadow-2xl ring-1 ring-white/10">
              <img src={turf.image} alt={turf.name} className="h-72 w-full object-cover" />
              <div className="px-6 py-6 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-bold text-white">{turf.name}</h1>
                    <p className="mt-2 text-slate-400">📍 {turf.location}</p>
                  </div>
                  <div className="rounded-3xl bg-green-500/10 px-4 py-2 text-green-300">
                    ₹{turf.price}/hr
                  </div>
                </div>

                <p className="mt-6 max-w-2xl text-slate-300">{turf.description}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.25em] text-green-300">Surface</p>
                    <p className="mt-2 text-lg text-slate-200">Synthetic turf, floodlights, player benches.</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.25em] text-green-300">Capacity</p>
                    <p className="mt-2 text-lg text-slate-200">Up to 14 players per slot.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold text-white">Select Date</h2>
                <p className="mt-2 text-slate-400">Choose your preferred playing day.</p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-4 w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none focus:border-green-400"
                />
              </div>

              <div className="rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold text-white">Select Slot</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                        selectedSlot === slot ? "bg-green-500 text-black" : "bg-white/5 text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Your details</h2>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-4 w-full rounded-3xl border border-white/10 bg-[#061016] px-4 py-3 text-white outline-none focus:border-green-400"
              />

              <button
                type="button"
                onClick={handleBooking}
                className="mt-6 w-full rounded-3xl bg-green-500 px-6 py-4 text-lg font-semibold text-black transition hover:bg-green-400"
              >
                Book on WhatsApp
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-white/10">
              <h3 className="text-xl font-semibold text-white">Booking summary</h3>
              <div className="mt-4 space-y-3 text-slate-300">
                <p>
                  <span className="font-semibold text-white">Turf:</span> {turf.name}
                </p>
                <p>
                  <span className="font-semibold text-white">Price:</span> ₹{turf.price}/hr
                </p>
                <p>
                  <span className="font-semibold text-white">Location:</span> {turf.location}
                </p>
                <p>
                  <span className="font-semibold text-white">Message:</span> Pre-filled message opens in WhatsApp.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-white/10">
              <h3 className="text-xl font-semibold text-white">Map preview</h3>
              <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
                <iframe
                  title="Turf location"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(turf.mapQuery)}&z=13&output=embed`}
                  className="h-72 w-full border-0"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
