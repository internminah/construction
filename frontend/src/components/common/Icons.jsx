import React from "react";

// Standard Icon Component Helper
const createIcon = (paths, viewBox = "0 0 24 24") => {
  return React.forwardRef((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      {paths}
    </svg>
  ));
};

export const Building2 = createIcon([
  <path key="1" d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />,
  <path key="2" d="M18 18h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />,
  <path key="3" d="M3 18h3" />,
  <path key="4" d="M18 18h3" />,
  <path key="5" d="M16 22H8" />,
  <path key="6" d="M12 6h.01" />,
  <path key="7" d="M12 10h.01" />,
  <path key="8" d="M12 14h.01" />,
  <path key="9" d="M12 18h.01" />,
  <path key="10" d="M8 6h.01" />,
  <path key="11" d="M8 10h.01" />,
  <path key="12" d="M8 14h.01" />,
  <path key="13" d="M8 18h.01" />,
  <path key="14" d="M16 6h.01" />,
  <path key="15" d="M16 10h.01" />,
  <path key="16" d="M16 14h.01" />,
  <path key="17" d="M16 18h.01" />,
]);

export const Menu = createIcon([
  <line key="1" x1="4" x2="20" y1="12" y2="12" />,
  <line key="2" x1="4" x2="20" y1="6" y2="6" />,
  <line key="3" x1="4" x2="20" y1="18" y2="18" />,
]);

export const X = createIcon([
  <path key="1" d="M18 6 6 18" />,
  <path key="2" d="m6 6 12 12" />,
]);

export const ArrowRight = createIcon([
  <path key="1" d="M5 12h14" />,
  <path key="2" d="m12 5 7 7-7 7" />,
]);

export const Facebook = createIcon([
  <path key="1" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
]);

export const Twitter = createIcon([
  <path key="1" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
]);

export const Instagram = createIcon([
  <rect key="1" width="20" height="20" x="2" y="2" rx="5" ry="5" />,
  <path key="2" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />,
  <line key="3" x1="17.5" x2="17.51" y1="6.5" y2="6.5" />,
]);

export const Linkedin = createIcon([
  <path key="1" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />,
  <rect key="2" width="4" height="12" x="2" y="9" />,
  <circle key="3" cx="4" cy="4" r="2" />,
]);

export const Mail = createIcon([
  <rect key="1" width="20" height="16" x="2" y="4" rx="2" />,
  <path key="2" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />,
]);

export const PhoneCall = createIcon([
  <path key="1" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  <path key="2" d="M14.05 2a9 9 0 0 1 8 7.94" />,
  <path key="3" d="M14.05 6A5 5 0 0 1 18 10" />,
]);

export const MapPin = createIcon([
  <path key="1" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />,
  <circle key="2" cx="12" cy="10" r="3" />,
]);

export const Award = createIcon([
  <circle key="1" cx="12" cy="8" r="7" />,
  <polyline key="2" points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />,
]);

export const Compass = createIcon([
  <circle key="1" cx="12" cy="12" r="10" />,
  <polygon key="2" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />,
]);

export const ShieldCheck = createIcon([
  <path key="1" d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6Z" />,
  <path key="2" d="m9 12 2 2 4-4" />,
]);

export const Target = createIcon([
  <circle key="1" cx="12" cy="12" r="10" />,
  <circle key="2" cx="12" cy="12" r="6" />,
  <circle key="3" cx="12" cy="12" r="2" />,
]);

export const Eye = createIcon([
  <path key="1" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />,
  <circle key="2" cx="12" cy="12" r="3" />,
]);

export const Building = createIcon([
  <rect key="1" width="16" height="20" x="4" y="2" rx="2" ry="2" />,
  <path key="2" d="M9 22v-4h6v4" />,
  <path key="3" d="M8 6h.01" />,
  <path key="4" d="M16 6h.01" />,
  <path key="5" d="M8 10h.01" />,
  <path key="6" d="M16 10h.01" />,
  <path key="7" d="M12 6h.01" />,
  <path key="8" d="M12 10h.01" />,
  <path key="9" d="M8 14h.01" />,
  <path key="10" d="M16 14h.01" />,
  <path key="11" d="M12 14h.01" />,
]);

export const Briefcase = createIcon([
  <path key="1" d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />,
  <rect key="2" width="20" height="14" x="2" y="6" rx="2" />,
]);

export const Globe = createIcon([
  <circle key="1" cx="12" cy="12" r="10" />,
  <path key="2" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />,
  <path key="3" d="M2 12h20" />,
]);

export const Users = createIcon([
  <path key="1" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />,
  <circle key="2" cx="9" cy="7" r="4" />,
  <path key="3" d="M22 21v-2a4 4 0 0 0-3-3.87" />,
  <path key="4" d="M16 3.13a4 4 0 0 1 0 7.75" />,
]);

export const HardHat = createIcon([
  <path key="1" d="M2 12a10 10 0 0 1 20 0Z" />,
  <path key="2" d="M5 12a7 7 0 0 1 14 0Z" />,
  <path key="3" d="M12 2v10" />,
  <path key="4" d="M12 12H5" />,
  <path key="5" d="M12 12h7" />,
  <path key="6" d="M2 12h20" />,
]);

export const Clock = createIcon([
  <circle key="1" cx="12" cy="12" r="10" />,
  <polyline key="2" points="12 6 12 12 16 14" />,
]);

export const HeartHandshake = createIcon([
  <path key="1" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  <path key="2" d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a1.13 1.13 0 0 0 .15-1.48L12 5Z" />,
  <path key="3" d="m13.2 8.4 1.3 1.3c.4.4.4 1 0 1.4L11 14.7" />,
]);

export const Trophy = createIcon([
  <path key="1" d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />,
  <path key="2" d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />,
  <path key="3" d="M4 22h16" />,
  <path key="4" d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />,
  <path key="5" d="M12 2a7 7 0 0 0-7 7c0 2.57 1.48 4.78 3.66 5.66h6.68C17.52 13.78 19 11.57 19 9a7 7 0 0 0-7-7Z" />,
]);

export const Heart = createIcon([
  <path key="1" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
]);

export const Activity = createIcon([
  <path key="1" d="M22 12h-4l-3 9L9 3l-3 9H2" />,
]);

export const ExternalLink = createIcon([
  <path key="1" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />,
  <polyline key="2" points="15 3 21 3 21 9" />,
  <line key="3" x1="10" x2="21" y1="14" y2="3" />,
]);

export const Hammer = createIcon([
  <path key="1" d="m15 5 4 4" />,
  <path key="2" d="M21.5 12H16l-.7 2 2 2-.7 2-3.8-3.8-.7-.7-.3-.3a4 4 0 1 0-5.6 5.6l5.3-5.3.7-.7.7.7 3.8 3.8-2 .7-2-2-2 .7v5.5l7.5-7.5Z" />,
  <path key="3" d="M15 5 9 11" />,
]);
