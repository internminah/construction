import { Target, Eye } from "@/components/common/Icons";

const defaultMission = {
  text: "To engineered structures of superior quality, ensuring safety, functionality, and aesthetic elegance. We are committed to exceeding our client's expectations through transparent workflows, cutting-edge technology, and unmatched craftsmanship, delivering project milestones on-time, every time.",
  points: [
    "Absolute transparency and cost honesty",
    "Zero compromise on structural integrity",
    "Punctual project deliveries"
  ]
};

const defaultVision = {
  text: "To be the global benchmark for architectural elegance and engineering brilliance. We strive to pioneer sustainable design standards and construction practices, shaping cities and communities for generations to come with environment-friendly, smart, and durable buildings.",
  points: [
    "Pioneering eco-friendly sustainable designs",
    "Shaping next-gen urban planning",
    "Integrating smart IoT structures"
  ]
};

export default function MissionVision({
  mission = defaultMission,
  vision = defaultVision,
}) {
  return (
    <section className="py-20 relative bg-gradient-to-b from-mint to-white overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Mission Card */}
          <div className="relative group rounded-2xl p-8 sm:p-10 border border-white/40 bg-white/40 backdrop-blur-md shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
            {/* Top accent glow */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-accent" />
            
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Icon Container */}
              <div className="p-4 bg-primary text-mint rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8" />
              </div>
              
              <div className="flex flex-col gap-4">
                <h3 className="font-poppins font-bold text-2xl text-slate-dark tracking-tight">
                  Our Mission
                </h3>
                <p className="font-sans text-slate-light leading-relaxed text-base">
                  {mission.text}
                </p>
                <ul className="text-sm font-sans text-slate-light space-y-2 mt-2">
                  {mission.points.map((point, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative group rounded-2xl p-8 sm:p-10 border border-white/40 bg-white/40 backdrop-blur-md shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 overflow-hidden">
            {/* Top accent glow */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent to-primary" />
            
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Icon Container */}
              <div className="p-4 bg-accent text-mint rounded-xl shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-300">
                <Eye className="h-8 w-8" />
              </div>
              
              <div className="flex flex-col gap-4">
                <h3 className="font-poppins font-bold text-2xl text-slate-dark tracking-tight">
                  Our Vision
                </h3>
                <p className="font-sans text-slate-light leading-relaxed text-base">
                  {vision.text}
                </p>
                <ul className="text-sm font-sans text-slate-light space-y-2 mt-2">
                  {vision.points.map((point, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
