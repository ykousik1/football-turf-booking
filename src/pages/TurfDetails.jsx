import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TurfDetails() {
  const { id } = useParams();
  const [turf, setTurf] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("turfs")) || [];
    const found = saved.find((t) => t.id === Number(id));
    setTurf(found);
  }, [id]);

  if (!turf) {
    return <div className="text-white p-6">Turf not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <img
        src={turf.image}
        className="w-full h-64 object-cover rounded-xl"
      />

      <div className="mt-6">
        <h1 className="text-3xl font-bold">{turf.name}</h1>
        <p className="text-gray-400 mt-2">📍 {turf.location}</p>
        <p className="text-green-400 text-xl mt-2">{turf.price}</p>
      </div>

    </div>
  );
}