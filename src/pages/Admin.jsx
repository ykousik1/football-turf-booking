import { useState, useEffect } from "react";

export default function Admin() {
  const [turfs, setTurfs] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("turfs")) || [];
    setTurfs(saved);
  }, []);

  // save data
  useEffect(() => {
    localStorage.setItem("turfs", JSON.stringify(turfs));
  }, [turfs]);

  // add turf
  const addTurf = () => {
    if (!name || !location) return;

    const newTurf = {
      id: Date.now(),
      name,
      location,
      price,
      image,
    };

    setTurfs([...turfs, newTurf]);

    setName("");
    setLocation("");
    setPrice("");
    setImage("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Panel ⚙️
      </h1>

      {/* FORM */}
      <div className="bg-gray-900 p-4 rounded mb-6">

        <input
          placeholder="Turf Name"
          className="w-full p-2 mb-2 bg-gray-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Location"
          className="w-full p-2 mb-2 bg-gray-800"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="Price"
          className="w-full p-2 mb-2 bg-gray-800"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Image URL"
          className="w-full p-2 mb-2 bg-gray-800"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          onClick={addTurf}
          className="bg-green-500 px-4 py-2 rounded w-full"
        >
          Add Turf
        </button>

      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {turfs.map((t) => (
          <div key={t.id} className="bg-gray-800 p-3 rounded">
            <img src={t.image} className="h-32 w-full object-cover rounded" />
            <h2 className="mt-2 font-bold">{t.name}</h2>
            <p className="text-sm text-gray-400">{t.location}</p>
            <p className="text-green-400">{t.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}