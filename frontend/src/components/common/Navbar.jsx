"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Building2 } from "@/components/common/Icons";
import { companyInfo as defaultCompanyInfo, navLinks as defaultNavLinks } from "@/lib/data";

export default function Navbar({
  companyInfo = defaultCompanyInfo,
  navLinks = defaultNavLinks,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-mint-dark"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary text-mint group-hover:bg-accent transition-colors duration-300">
              <Building2 className="h-6 w-6" />
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight text-slate-dark">
              {companyInfo.name.split(" ")[0]} <span className="text-primary font-extrabold group-hover:text-accent transition-colors duration-300">{companyInfo.name.split(" ").slice(1).join(" ")}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative font-poppins font-medium text-sm transition-colors duration-300 py-2 ${
                    active
                      ? "text-primary font-bold"
                      : "text-slate-light hover:text-primary"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Get a Quote Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              href="/contact?quote=true"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-poppins font-semibold text-sm rounded-lg text-mint bg-primary hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-light hover:text-primary hover:bg-mint-dark/50 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-slate-dark/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-screen w-3/4 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-mint-dark">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Building2 className="h-6 w-6 text-primary" />
                <span className="font-poppins font-bold text-lg text-slate-dark">
                  {companyInfo.name.split(" ")[0]} <span className="text-primary font-extrabold">{companyInfo.name.split(" ").slice(1).join(" ")}</span>
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-slate-light hover:text-primary hover:bg-mint-dark/50 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-poppins font-semibold text-lg py-2 px-3 rounded-lg transition-colors ${
                      active
                        ? "bg-mint text-primary"
                        : "text-slate-light hover:bg-mint/50 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto">
            <Link
              href="/contact?quote=true"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center px-6 py-4 font-poppins font-bold text-base rounded-lg text-mint bg-primary hover:bg-primary-light transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
