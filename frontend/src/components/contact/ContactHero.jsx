import Link from "next/link";

export default function ContactHero({ companyInfo }) {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070')",
        }}
      />
      {/* Dark Emerald Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/35" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left w-full">
        <div className="max-w-3xl">
          {/* Animated Badge */}
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30 uppercase tracking-widest mb-6 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Get In Touch
          </span>

          <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-6">
            Start Your <br />
            <span className="text-accent">Construction Roadmap</span>
          </h1>

          <p className="font-sans text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            Submit your project specifications or contact our regional representatives directly. We're ready to build your vision.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute bottom-16 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/50 font-poppins font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-accent">Contact</span>
          </nav>
        </div>
      </div>

      {/* Bottom SVG Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[30px] text-mint fill-current"
        >
          <path d="M1200 120L0 120L0 0L1200 120Z" />
        </svg>
      </div>
    </section>
  );
}
