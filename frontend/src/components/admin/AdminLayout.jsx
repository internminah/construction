"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Award,
  Briefcase,
  Heart,
  Activity,
} from "@/components/common/Icons";

const SettingsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LogoutIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const HamburgerIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default function AdminLayout({ children, companyInfo, activeTab }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
        setCheckingAuth(false);
      }
    }
  }, [router]);

  const handleLogout = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
    router.push("/admin/login");
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: Activity },
    { name: "Contacts", href: "/admin/contacts", icon: Mail },
    { name: "Services", href: "/admin/services", icon: Building2 },
    { name: "Portfolio", href: "/admin/portfolio", icon: Award },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Reviews", href: "/admin/reviews", icon: Heart },
  ];

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-mint flex flex-col justify-center items-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-primary/10 text-primary rounded-2xl animate-pulse">
            <Building2 className="h-10 w-10 animate-spin [animation-duration:3s]" />
          </div>
          <div className="text-center">
            <h3 className="font-poppins font-bold text-lg text-slate-dark">Verifying Session</h3>
            <p className="text-xs text-slate-light mt-1">Please wait while we secure your connection...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-mint flex font-sans">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-darkest text-gray-400 shrink-0 border-r border-slate-800">
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800/60">
          <Building2 className="h-6 w-6 text-accent" />
          <span className="font-poppins font-bold text-white tracking-tight text-sm">
            {companyInfo.name} <span className="text-accent text-[10px] block font-sans tracking-widest font-semibold uppercase -mt-0.5">Admin Hub</span>
          </span>
        </div>
        
        <nav className="flex-grow py-6 px-4 space-y-1">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = link.name === activeTab;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <IconComponent className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/60 space-y-1">
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins font-medium transition-colors ${
              activeTab === "Settings"
                ? "bg-primary text-white"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
          <a
            href="#logout"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogoutIcon className="h-5 w-5" />
            Logout
          </a>
        </div>
      </aside>

      {/* Sidebar - Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-darkest/60 backdrop-blur-sm">
          <div className="w-64 bg-slate-darkest text-gray-400 flex flex-col h-full relative">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white focus:outline-none"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
            <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800/60">
              <Building2 className="h-6 w-6 text-accent" />
              <span className="font-poppins font-bold text-white tracking-tight text-sm">
                {companyInfo.name}
              </span>
            </div>
            <nav className="flex-grow py-6 px-4 space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = link.name === activeTab;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-slate-800/60 space-y-1">
              <Link
                href="/admin/settings"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins font-medium transition-colors ${
                  activeTab === "Settings"
                    ? "bg-primary text-white"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <SettingsIcon className="h-5 w-5" />
                Settings
              </Link>
              <a
                href="#logout"
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                <LogoutIcon className="h-5 w-5" />
                Logout
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-primary/5 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-dark hover:text-primary focus:outline-none"
            >
              <HamburgerIcon className="h-6 w-6" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-light/60 font-poppins hidden sm:inline-block">
              Root &gt; {activeTab}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-poppins font-bold text-slate-dark block">System Administrator</span>
              <span className="text-[10px] font-sans text-primary font-semibold block uppercase tracking-wider">Super Admin</span>
            </div>
            <div className="h-10 w-10 bg-primary text-mint rounded-full flex items-center justify-center font-poppins font-bold text-sm shadow-md border-2 border-mint-dark">
              SA
            </div>
          </div>
        </header>

        {/* Inner Content wrapper */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
