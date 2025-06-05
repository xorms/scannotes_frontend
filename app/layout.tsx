import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import { Sidebar } from "./components/sidebar/Sidebar";
import { Mainpanel } from "./components/mainpanel/Mainpanel";

import "./styles/globals.css";
//import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <div className="container">
            <Sidebar/>
            <Mainpanel/>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
