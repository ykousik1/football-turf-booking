import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-green-400">
          TurfKhelo ⚽
        </Link>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10 md:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="text-green-400">❯</span>
        </button>

        <nav
          className={`${open ? "block" : "hidden"} w-full rounded-3xl bg-slate-950/95 p-4 shadow-xl md:block md:w-auto md:bg-transparent md:p-0`}
        >
          <ul className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:gap-8">
            <li>
              <Link to="/" className="block hover:text-green-400" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/turfs" className="block hover:text-green-400" onClick={() => setOpen(false)}>
                Turfs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block hover:text-green-400" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="inline-flex items-center rounded-full border border-white/10 bg-green-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-400"
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
