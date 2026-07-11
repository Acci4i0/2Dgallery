import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useRefCollector from "../hooks/useRefCollector";
import { splitTextIntoLines } from "../utils/splitText";

// Icona X 15x15 (due tratti diagonali)
function CrossIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="2.5" y1="2.5" x2="12.5" y2="12.5" stroke="currentColor" strokeLinecap="round" />
      <line x1="12.5" y1="2.5" x2="2.5" y2="12.5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

// Overlay progetto fullscreen aperto dal click su una thumbnail della home.
// Entrata: pannello y 100% -> 0 in 1s ease [0.76, 0, 0.24, 1]; righe testo a
// cascata (0.75s, ease [0.33, 1, 0.68, 1]); immagini via GSAP (stagger 0.02).
// Chiusura: unmount istantaneo (come il riferimento).
export default function ProjectDetails({ project, setOpenDetails }) {
  const [imageRefs, addImageRef] = useRefCollector();
  const [closeRefs, addCloseRef] = useRefCollector();

  const setInitial = () => {
    gsap.set(imageRefs.current, { yPercent: 100, opacity: 0 });
    gsap.set(closeRefs.current, { yPercent: 100 });
  };

  const enter = () => {
    gsap
      .timeline({})
      .to(imageRefs.current, { visibility: "visible" }, "<")
      .to(imageRefs.current, {
        yPercent: 0,
        delay: 0.1,
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: "power2.out",
      })
      .to(closeRefs.current, { visibility: "visible" }, "-=0.5")
      .to(closeRefs.current, {
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
      }, "<");
  };

  useGSAP(() => {
    setInitial();
    enter();
  }, []);

  const lines = splitTextIntoLines(project?.description || "");

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      style={{ zIndex: 10000 }}
      className="h-[100vh] top-0 bg-white fixed w-full flex flex-col"
    >
      <div
        style={{ fontSize: "0.8rem" }}
        className="px-5 py-3 flex font-medium items-center uppercase w-full"
      >
        <div className="md:w-6/12 w-4/12 flex overflow-hidden" />
        <div className="w-8/12 md:w-6/12 flex justify-end overflow-hidden">
          <div className="invisible" ref={addCloseRef}>
            <motion.div
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpenDetails(false)}
              className="cursor-pointer"
            >
              <CrossIcon />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row pt-8 md:pt-24">
        <div className="w-0 md:w-1/12 order-2 sm:order-1" />
        <div className="md:w-4/12 w-12/12 px-5 md:pt-0 pt-5 md:px-0 flex flex-col order-3 sm:order-2">
          <div className="flex flex-col">
            <div className="overflow-hidden flex justify-between">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.75 }}
              >
                {project?.title}
              </motion.div>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                className="text-sm opacity-70 items-center flex md:hidden font-light"
                transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.75 }}
              >
                {project?.year}
              </motion.div>
            </div>
          </div>
          <div className="overflow-hidden hidden opacity-70 md:flex">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              className="mt-2 w-8/12 text-sm font-light"
              transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.9 }}
            >
              {project?.year}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <div className="mt-4 md:mt-8 w-12/12 text-sm hidden md:block font-light">
              {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.75,
                      ease: [0.33, 1, 0.68, 1],
                      delay: 0.75 + 0.075 * (i + 2),
                    }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="mt-1 md:mt-8 w-12/12 block md:hidden text-xs font-light">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.75,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.75 + 0.075 * 3,
                }}
              >
                {project?.description}
              </motion.div>
            </div>
          </div>
        </div>
        <div className="w-full px-5 md:px-0 md:w-7/12 h-[60vh] md:h-[70vh] overflow-hidden mr-5 order-0 sm:order-3">
          <div className="flex overflow-y-hidden gap-8 items-center">
            {(project?.images || []).map((src, i) => (
              <div
                key={i}
                ref={addImageRef}
                className="h-[60vh] md:h-[70vh] w-[80vw] md:w-[40vw] object-top relative shrink-0"
              >
                <Image src={src} fill className="object-contain" alt={`${project?.title} — foto ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
