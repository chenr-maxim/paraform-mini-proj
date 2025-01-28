import React from "react";
import { ILayoutProps } from "@/types/components";

import styles from "../styles/layout.module.scss";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles["layout-container"]}>
      <main className={styles["layout-main"]}>{children}</main>
    </div>
  );
};

export default Layout;
