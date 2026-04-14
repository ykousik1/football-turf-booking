export default function Contact() {
  return (
    <div className="min-h-screen bg-[#040a10] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-green-300">Get in touch</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Contact TurfKhelo</h1>
          <p className="mt-3 text-slate-400">
            Have questions about booking, tournaments or turf availability? Reach out on WhatsApp or email.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-white">Phone</h2>
            <p className="mt-4 text-slate-300">+91 99999 99999</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-white">Email</h2>
            <p className="mt-4 text-slate-300">info@turfkhelo.com</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-white">WhatsApp</h2>
            <a
              href="https://wa.me/916303480824?text=Hi%20TurfKhelo%20team,%20I%20need%20help%20with%20a%20booking"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
