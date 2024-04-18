import "./components/bootstrap-reboot.css";
import "./components/google-fonts.css";
import "./components/globals.css";
import styles from "./layout.module.css";
import AppLink from "@/app/components/AppLink";
import React from "react";

export const metadata = {
  title: "BeerAdvisor",
  description: "BeerAdvisor Next.js Sample App",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className={styles.BeerRatingApp}>
          <header className={styles.Header}>
            <div className={styles.MainHeader}>
              <h1>
                <AppLink href={"/"}>Beer Advisor</AppLink>
              </h1>
            </div>
          </header>
          <div className={styles.Main}>{children}</div>
          <footer className={styles.Footer}>
            <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
              {GITHUB_REPO}
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
const GITHUB_REPO = "https://github.com/nilshartmann/nextjs-beeradvisor";
