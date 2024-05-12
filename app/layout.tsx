"use client"

import Navbar from "@/components/Navbar";
import Store from "@/store/store";
import { observer } from "mobx-react-lite";
import { createContext, useContext, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <html lang="en">
      <Context.Provider value={{
        store
      }}>
        <body>
          <Navbar />
          {children}
        </body>
      </Context.Provider>
    </html>
  );
}

export default observer(RootLayout)
