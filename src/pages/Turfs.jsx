import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Turfs() {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("turfs")) || [];
    setTurfs(saved);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Book Football Turfs ⚽
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {turfs.length === 0 ? (
          <p>No turfs added yet</p>
        ) : (
          turfs.map((turf) => (
            <div
              key={turf.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <img
                src={turf.image}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {turf.name}
                </h2>

                <p className="text-gray-400 text-sm">
                  📍 {turf.location}
                </p>

                <p className="text-green-400 mt-2 font-bold">
                  {turf.price}
                </p>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/turf/${turf.id}`}
                    className="bg-gray-700 px-3 py-2 rounded text-sm"
                  >
                    View
                  </Link>

                  <a
                    href={`https://wa.me/91XXXXXXXXXX?text=Hi, I want to book ${turf.name}`}
                    target="_blank"
                    className="bg-green-500 px-3 py-2 rounded text-sm"
                  >
                    Book
                  </a>
                </div>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}