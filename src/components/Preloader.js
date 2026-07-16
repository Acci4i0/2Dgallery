import { forwardRef, useEffect, useState } from "react";

// Contatore del preloader: step non lineari avanzati ogni 100ms (0 -> 100 in
// 1.6s). Questo modulo possiede markup e logica del contatore; l'USCITA
// (dopo 1.7s vola in alto: yPercent -150, opacity 0, 1.3s, power3.inOut) è
// orchestrata dalla timeline GSAP della home, che riceve il nodo via ref.
// Gli altri progetti replicano lo stesso comportamento con un modulo vanilla
// (preloader.js) che porta questi stessi valori.
export const COUNTER_STEPS = [0, 7, 15, 21, 30, 38, 45, 55, 63, 73, 74, 80, 86, 91, 98, 99, 100];

function Counter() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => {
        const next = i + 1;
        if (next >= COUNTER_STEPS.length) {
          clearInterval(id);
          return i;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, []);

  return <div>{COUNTER_STEPS[index]}</div>;
}

const Preloader = forwardRef(function Preloader(_props, ref) {
  return (
    <div ref={ref} className="fixed top-0 pl-1 w-full flex uppercase text-7xl">
      <div className="w-8/12">
        <Counter />
      </div>
      <div className="w-4/12">100</div>
    </div>
  );
});

export default Preloader;
