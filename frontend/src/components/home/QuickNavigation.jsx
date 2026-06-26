"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/common/Icons";

export default function QuickNavigation() {
  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Completed Projects", href: "/portfolio" },
    { name: "Contact Office", href: "/contact" },
  ];

  return (
    <section className="bg-white border-t border-primary/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Tagline */}
          <div className="text-center sm:text-left">
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary block mb-1">
              Explore Our Site
            </span>
            <span className="font-sans text-xs text-slate-light">
              Quickly navigate to our main pages to learn more.
            </span>
          </div>

          {/* Nav Links row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-poppins font-semibold text-xs sm:text-sm text-slate-light hover:text-primary transition-colors flex items-center gap-1.5 group"
              >
                {link.name}
                <ArrowRight className="h-3.5 w-3.5 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
