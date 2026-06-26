"use client";

import { useState } from "react";

export default function WhatsAppIntegration({ companyInfo }) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Strip non-numbers from phone for wa.me link
  const formattedPhone = companyInfo.phone.replace(/[^\d+]/g, "");
  const defaultMessage = encodeURIComponent(
    `Hi I Constructions, I'd like to request a consultation or get a quote for a construction project.`
  );
  
  // WhatsApp wa.me link
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${defaultMessage}`;

  return (
    <div
      className="fixed bottom-24 right-6 z-40 flex items-center group cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip Label */}
      <div
        className={`bg-slate-dark text-white text-xs font-poppins font-semibold py-2 px-3 rounded-lg shadow-lg border border-white/10 mr-3 transition-all duration-300 pointer-events-none whitespace-nowrap hidden sm:block ${
          showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        Chat on WhatsApp
      </div>

      {/* Floating Button with Bouncing/Breathing Animation */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 animate-bounce relative"
        style={{ animationDuration: "3s" }}
        aria-label="Contact via WhatsApp"
      >
        {/* Pulsing ring decoration */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping -z-10" style={{ animationDuration: "2s" }} />

        {/* WhatsApp SVG Icon */}
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.465L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.773 1.451 5.386 0 9.766-4.376 9.769-9.762.001-2.61-1.01-5.064-2.846-6.9a9.712 9.712 0 0 0-6.924-2.863c-5.39 0-9.771 4.382-9.775 9.77-.001 1.704.453 3.371 1.312 4.83l-.994 3.63 3.738-.98c1.517.828 3.056 1.254 4.547 1.254zm11.002-7.534c-.302-.15-1.787-.882-2.063-.982-.277-.1-.478-.15-.68.15-.201.3-.778.982-.954 1.182-.176.2-.352.226-.654.076-.301-.15-1.274-.47-2.426-1.498-.896-.799-1.5-1.787-1.676-2.087-.176-.3-.019-.462.132-.612.135-.135.302-.35.452-.526.151-.176.201-.3.302-.5.101-.2.05-.376-.026-.526-.075-.15-.68-1.638-.931-2.24-.244-.587-.492-.507-.68-.507-.176-.004-.377-.004-.578-.004-.201 0-.527.075-.803.376-.277.301-1.055 1.027-1.055 2.508 0 1.48 1.08 2.91 1.23 3.11.15.2 2.124 3.242 5.146 4.545.718.31 1.279.495 1.716.634.721.23 1.378.198 1.9.12.58-.087 1.787-.73 2.038-1.43.25-.7.25-1.303.176-1.43-.075-.126-.277-.201-.579-.351z" />
        </svg>
      </a>
    </div>
  );
}
