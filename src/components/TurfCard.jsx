import { Link } from "react-router-dom";

export default function TurfCard({ turf }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      
      <img
        src={turf.image}
        className="h-44 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">{turf.name}</h2>
        <p className="text-gray-500">{turf.location}</p>

        <div className="flex justify-between items-center mt-2">
          <p className="text-green-600 font-semibold">
            ₹{turf.price}/hr
          </p>

          <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded">
            ⚡ Filling Fast
          </span>
        </div>

        <Link
          to={`/turf/${turf.id}`}
          className="bg-green-500 text-white w-full mt-3 block text-center py-2 rounded-lg hover:bg-green-600"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}