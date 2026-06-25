import { Award, Compass, ShieldCheck } from "@/components/common/Icons";
import { companyInfo as defaultCompanyInfo } from "@/lib/data";

export default function CompanyIntro({
  companyInfo = defaultCompanyInfo,
}) {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - companyInfo.foundedYear;

  return (
    <section className="py-20 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Image and Floating Card */}
          <div className="relative group">
            {/* Background Decorative Element */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-accent/10 rounded-3xl blur-2xl -z-10 group-hover:bg-accent/20 transition-colors duration-500" />
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/10 rounded-3xl blur-2xl -z-10 group-hover:bg-primary/20 transition-colors duration-500" />
            
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden border border-primary/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070"
                alt={`${companyInfo.name} Premium Architectural Design`}
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Experience Card */}
            <div className="absolute bottom-6 -right-6 md:right-8 bg-white border border-mint-dark p-6 rounded-xl shadow-xl max-w-[240px] backdrop-blur-md bg-white/95">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-2xl text-slate-dark leading-tight">{experienceYears}+ Years</h4>
                  <p className="font-sans text-xs text-slate-light font-medium uppercase tracking-wider mt-1">
                    Industry Experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div className="flex flex-col gap-6 lg:pl-4">
            <div className="flex items-center gap-2">
              <span className="w-12 h-[2px] bg-primary rounded" />
              <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                About Our Firm
              </span>
            </div>

            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Who We Are
            </h2>

            <div className="font-sans text-slate-light text-base leading-relaxed space-y-4">
              {companyInfo.detailedDescription.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Mini Core Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-slate-dark">Architectural Vision</h4>
                  <p className="font-sans text-xs text-slate-light mt-1">Merging aesthetics with robust engineering.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-slate-dark">Premium Quality</h4>
                  <p className="font-sans text-xs text-slate-light mt-1">Sourcing structural components of the highest grades.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
