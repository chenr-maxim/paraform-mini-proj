import React from "react";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";

import "../app/globals.css";
import styles from "../styles/layout.module.scss";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Paraform Takehome Assessment Greenhouse UI",
  description: "Job application portal for Paraform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header className={styles["layout-header"]}></header>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
