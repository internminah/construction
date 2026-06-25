export default function QuotationForm({ services }) {
  const budgetOptions = [
    "Under $100,000",
    "$100,000 - $500,000",
    "$500,000 - $2,000,000",
    "$2,000,000+"
  ];

  return (
    <section id="quote" className="py-20 bg-mint scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Pricing Estimation
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            Request a Project Quotation
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            Provide details on your location, scale, and budget. Our cost managers will draft a preliminary estimation.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-primary/5 rounded-2xl p-8 sm:p-12 shadow-xl max-w-4xl mx-auto">
          <h3 className="font-poppins font-bold text-2xl text-slate-dark mb-8">
            Specification Form
          </h3>
          
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field 1: Name */}
            <div>
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Marcus Sterling"
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>

            {/* Field 2: Email */}
            <div>
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="marcus@example.com"
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>

            {/* Field 3: Service Category */}
            <div>
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Select Division / Service
              </label>
              <select
                required
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              >
                <option value="">Choose a service...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 4: Budget Scale */}
            <div>
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Estimated Project Budget
              </label>
              <select
                required
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              >
                <option value="">Select a range...</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 5: Location */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Project Site Location
              </label>
              <input
                type="text"
                required
                placeholder="Manhattan, NY"
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>

            {/* Field 6: Details */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Description of Requirements
              </label>
              <textarea
                rows={5}
                required
                placeholder="Tell us about the site dimensions, architectural specifications, or custom requests..."
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Submit Button (Type button to avoid Server Component form submission errors) */}
            <div className="sm:col-span-2 mt-2">
              <button
                type="button"
                className="w-full bg-primary hover:bg-primary-light text-mint font-poppins font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Submit Specification Form
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
