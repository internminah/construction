import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "I Constructions | Building Excellence Since 2015",
  description: "A premium construction and engineering firm inspired by high-end architecture. Build, plan, and design with trustworthy professionals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} font-sans scroll-smooth`}>
      <body className="flex flex-col min-h-screen bg-mint text-slate-dark antialiased">
        {children}
      </body>
    </html>
  );
}
