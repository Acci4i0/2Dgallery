import "../styles/globals.css";
import { useEffect } from "react";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { site } from "../data/images";

export default function App({ Component, pageProps, router }) {
  // Lenis su window, config default (lerp 0.1, smoothWheel, touch nativo),
  // raf loop manuale — come il riferimento.
  useEffect(() => {
    const lenis = new Lenis();
    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parent">
      <Head>
        <title>{site.title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </div>
  );
}
