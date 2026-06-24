import Link from "next/link";
import * as Icons from "@/components/common/Icons";
import {
  getCompanyInfo,
  getDashboardStats,
  getServices,
  getProjects,
  getReviews,
  getContactInfo,
} from "@/lib/data";

export const metadata = {
  title: "Admin Dashboard | I Constructions",
  description: "Management portal for checking client inquiries, portfolio project cards, and client reviews.",
};

export default async function AdminPage() {
  const [
    company,
    stats,
    allServices,
    allProjects,
    allReviews,
    contacts,
  ] = await Promise.all([
    getCompanyInfo(),
    getDashboardStats(),
    getServices(),
    getProjects(),
    getReviews(),
    getContactInfo(),
  ]);

  const { Building2, Award } = Icons;

  return (
    <div className="min-h-screen bg-mint flex flex-col font-sans">
      {/* Admin Sticky Header */}
      <header className="bg-slate-dark text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent" />
            <span className="font-poppins font-bold text-sm tracking-tight">
              {company.name} <span className="text-accent text-xs">Admin Portal</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs font-poppins font-semibold border border-slate-600 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            Back to Website
          </Link>
        </div>
      </header>

      {/* Main Panel */}
      <main className="flex-grow py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Dashboard Title */}
        <div className="mb-10">
          <h1 className="font-poppins font-bold text-3xl text-slate-dark">Dashboard Overview</h1>
          <p className="font-sans text-slate-light text-sm mt-1">
            Real-time operations summary for {company.name}.
          </p>
        </div>

        {/* Stats Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => {
            const IconComponent = Icons[stat.iconName] || Icons.Award;
            return (
              <div
                key={stat.id}
                className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-4 bg-primary/10 text-primary rounded-xl shrink-0">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-primary mt-1 block">
                    {stat.change} vs last month
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Module 1: Active Services */}
          <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-md">
            <h2 className="font-poppins font-bold text-xl text-slate-dark mb-6 border-b border-mint-dark pb-4 flex justify-between items-center">
              <span>Admin Services</span>
              <span className="text-xs py-1 px-2.5 bg-mint text-primary rounded-md font-semibold">
                {allServices.length} Active
              </span>
            </h2>
            <div className="space-y-4">
              {allServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-mint/40 transition-colors">
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-slate-dark">{service.title}</h4>
                    <p className="text-xs text-slate-light mt-0.5">{service.slug}</p>
                  </div>
                  <span className="text-xs py-1 px-2 border border-primary/20 text-primary rounded font-semibold">
                    Manage
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Module 2: Active Projects */}
          <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-md">
            <h2 className="font-poppins font-bold text-xl text-slate-dark mb-6 border-b border-mint-dark pb-4 flex justify-between items-center">
              <span>Admin Portfolio & Projects</span>
              <span className="text-xs py-1 px-2.5 bg-mint text-primary rounded-md font-semibold">
                {allProjects.length} Total
              </span>
            </h2>
            <div className="space-y-4">
              {allProjects.map((project) => (
                <div key={project.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-mint/40 transition-colors">
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-slate-dark">{project.title}</h4>
                    <p className="text-xs text-slate-light mt-0.5">{project.category} &bull; {project.location}</p>
                  </div>
                  <span className="text-xs py-1 px-2 border border-primary/20 text-primary rounded font-semibold">
                    Edit
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Module 3: Client Reviews */}
          <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-md">
            <h2 className="font-poppins font-bold text-xl text-slate-dark mb-6 border-b border-mint-dark pb-4 flex justify-between items-center">
              <span>Admin Reviews</span>
              <span className="text-xs py-1 px-2.5 bg-mint text-primary rounded-md font-semibold">
                {allReviews.length} Approved
              </span>
            </h2>
            <div className="space-y-4">
              {allReviews.map((review) => (
                <div key={review.id} className="p-3 rounded-lg hover:bg-mint/40 transition-colors flex gap-4">
                  <img src={review.image} alt={review.clientName} className="h-10 w-10 rounded-full object-cover shrink-0" />
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-slate-dark">{review.clientName}</h4>
                    <p className="text-xs text-slate-light font-medium uppercase mt-0.5">{review.role}</p>
                    <p className="text-xs text-slate-light mt-2 italic leading-relaxed">&ldquo;{review.content.substring(0, 80)}...&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module 4: Contact Support Cards */}
          <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-md">
            <h2 className="font-poppins font-bold text-xl text-slate-dark mb-6 border-b border-mint-dark pb-4 flex justify-between items-center">
              <span>Admin Contacts</span>
              <span className="text-xs py-1 px-2.5 bg-mint text-primary rounded-md font-semibold">
                {contacts.length} Endpoints
              </span>
            </h2>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-mint/40 transition-colors">
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-slate-dark">{contact.title}</h4>
                    <p className="text-xs text-slate-light mt-0.5 truncate max-w-xs">{contact.detail}</p>
                  </div>
                  <span className="text-xs py-1 px-2 border border-primary/20 text-primary rounded font-semibold">
                    Configure
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Admin Footer */}
      <footer className="bg-slate-900 text-gray-500 py-6 border-t border-slate-800 text-center text-xs">
        &copy; {new Date().getFullYear()} {company.name} Administration Panel. All systems operational.
      </footer>
    </div>
  );
}
