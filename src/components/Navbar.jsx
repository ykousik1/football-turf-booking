import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-green-500 font-bold text-xl">
        TurfBook ⚽
      </h1>

      <div className="space-x-6 text-sm">
        <Link to="/" className="hover:text-green-400">Home</Link>
        <Link to="/turfs" className="hover:text-green-400">Turfs</Link>
        <Link to="/contact" className="hover:text-green-400">Contact</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}