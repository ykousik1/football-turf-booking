import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Turfs from "./pages/Turfs";
import TurfDetails from "./pages/TurfDetails";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#040a10] text-white">
        <Navbar />

        <main className="pt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/turfs" element={<Turfs />} />
            <Route path="/turf/:id" element={<TurfDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}
