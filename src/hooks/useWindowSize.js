import { useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Stessa struttura del riferimento: width/height inizialmente null,
// aggiornati in useLayoutEffect al mount e su resize.
export default function useWindowSize() {
  const [size, setSize] = useState({ width: null, height: null });

  useIsomorphicLayoutEffect(() => {
    const update = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
