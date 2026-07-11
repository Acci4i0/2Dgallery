import { useRef } from "react";

// Raccoglie in un array i nodi DOM di una serie di elementi (callback ref),
// senza duplicati: è il bersaglio delle timeline GSAP di ingresso.
// Uso: const [nodes, addRef] = useRefCollector();  ...  gsap.to(nodes.current, ...)
export default function useRefCollector() {
  const nodes = useRef([]);
  const addRef = (el) => {
    if (el && !nodes.current.includes(el)) nodes.current.push(el);
  };
  return [nodes, addRef];
}
