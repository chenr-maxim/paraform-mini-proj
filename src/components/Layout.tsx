import React from "react";
import { LayoutProps } from "@/types/components";

import styles from "../styles/layout.module.scss";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles["layout-container"]}>
      <main className={styles["layout-main"]}>{children}</main>
    </div>
  );
};

export default Layout;
