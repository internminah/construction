import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  getCompanyInfo,
  getNavLinks,
  getSocialLinks,
  getServices,
} from "@/lib/data";

export default async function Home() {
  const [company, links, socials, allServices] = await Promise.all([
    getCompanyInfo(),
    getNavLinks(),
    getSocialLinks(),
    getServices(),
  ]);

  return (
    <>
      <Navbar companyInfo={company} navLinks={links} />
      <main className="flex-grow">
        <div className={styles.page}>
          <main className={styles.main}>
            <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <div className={styles.intro}>
              <h1 className="font-poppins font-bold text-2xl text-slate-dark text-center">Welcome to {company.name}</h1>
              <p className="text-center text-sm text-slate-light mt-2 max-w-md mx-auto">
                {company.description}
              </p>
              <div className="mt-8 border-t border-mint-dark pt-6 text-center">
                <h2 className="font-poppins font-bold text-sm text-slate-dark uppercase tracking-wider">To get started, edit the page.js file.</h2>
                <p className="text-xs text-slate-light mt-1">
                  Looking for a starting point or more instructions? Head over to{" "}
                  <a
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary hover:text-primary-light"
                  >
                    Templates
                  </a>{" "}
                  or the{" "}
                  <a
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary hover:text-primary-light"
                  >
                    Learning
                  </a>{" "}
                  center.
                </p>
              </div>
            </div>
            <div className={styles.ctas}>
              <a
                className={styles.primary}
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.logo}
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={16}
                  height={16}
                />
                Deploy Now
              </a>
              <a
                className={styles.secondary}
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </div>
          </main>
        </div>
      </main>
      <Footer
        companyInfo={company}
        quickLinks={links}
        services={allServices}
        socialLinks={socials}
      />
    </>
  );
}
