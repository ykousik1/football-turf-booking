import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Turfs from "./pages/Turfs";
import TurfDetails from "./pages/TurfDetails";
import Contact from "./pages/Contact";
import WhatsAppButton from "./components/WhatsAppButton";

import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turfs" element={<Turfs />} />
        <Route path="/turf/:id" element={<TurfDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        
      </Routes>

      <WhatsAppButton />
    </BrowserRouter>
  );
}