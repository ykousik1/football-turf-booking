import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Turfs from "./pages/Turfs";
import TurfDetails from "./pages/TurfDetails";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import WhatsAppButton from "./components/WhatsAppButton";
import IntroAnimation from "./components/IntroAnimation";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

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
        {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      </div>
    </BrowserRouter>
  );
}
