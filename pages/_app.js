import "@/styles/globals.css";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <div>
          <Header />
          <SideBar />
        </div>
        <main>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  );
}
