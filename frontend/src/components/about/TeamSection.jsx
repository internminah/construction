import * as Icons from "@/components/common/Icons";
import { teamMembers as defaultTeam } from "@/lib/data";

export default function TeamSection({
  team = defaultTeam,
}) {
  const { Linkedin, Twitter, Mail } = Icons;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Our Leaders
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            Meet Our Visionary Team
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            A cohesive alliance of structural engineers, modern architects, and detail-oriented managers.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="group bg-mint border border-primary/5 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Photo Area with overlay icons */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  {/* Hover Social Handles */}
                  <div className="flex gap-3">
                    <a
                      href={member.socials.linkedin}
                      className="p-2.5 rounded-lg bg-white/90 hover:bg-accent text-primary hover:text-white transition-colors shadow-md"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.socials.twitter}
                      className="p-2.5 rounded-lg bg-white/90 hover:bg-accent text-primary hover:text-white transition-colors shadow-md"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-2.5 rounded-lg bg-white/90 hover:bg-accent text-primary hover:text-white transition-colors shadow-md"
                      aria-label={`${member.name} Email`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <h3 className="font-poppins font-bold text-lg text-slate-dark tracking-tight">
                  {member.name}
                </h3>
                <p className="font-sans text-xs text-primary font-semibold tracking-wider uppercase mt-1">
                  {member.role}
                </p>
                <p className="font-sans text-slate-light text-xs sm:text-sm mt-4 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
