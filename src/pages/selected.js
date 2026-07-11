import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Cursor from "../components/Cursor";
import useRefCollector from "../hooks/useRefCollector";
import useWindowSize from "../hooks/useWindowSize";
import { selectedThumbs, selectedFull } from "../data/images";

// /selected: immagine grande centrale + filmstrip fixed a tutto viewport
// scrollabile in orizzontale. La thumb che entra nella banda sinistra dell'1%
// (IntersectionObserver, rootMargin "0px -99% 0px 0px") imposta l'indice e
// l'immagine grande cambia src istantaneamente.
export default function Selected() {
  const stripRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (!stripRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrent(Number(entry.target.dataset.index));
          }
        });
      },
      {
        root: stripRef.current,
        rootMargin: "0px -99% 0px 0px",
        threshold: 0,
      }
    );
    const slides = stripRef.current.querySelectorAll(".image-slide");
    slides.forEach((el) => observer.observe(el));
    return () => {
      slides.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const [thumbRefs, addThumbRef] = useRefCollector();
  const [headerRefs, addHeaderRef] = useRefCollector();
  const bigImageRef = useRef(null);

  const setInitial = () => {
    gsap.set(headerRefs.current, { yPercent: 100 });
    if (windowSize.width < 768) {
      gsap.set(thumbRefs.current, { opacity: 0 });
      gsap.set(bigImageRef.current, { opacity: 0 });
    } else {
      gsap.set(thumbRefs.current, { yPercent: 250, opacity: 0 });
      gsap.set(bigImageRef.current, { yPercent: 100 });
    }
  };

  const enter = () => {
    const tl = gsap.timeline({});
    if (windowSize.width < 768) {
      tl.to(thumbRefs.current, { visibility: "visible" })
        .to(thumbRefs.current, {
          opacity: 1,
          duration: 1,
          stagger: 0.07,
          ease: "power3.out",
        }, "<")
        .to(bigImageRef.current, { visibility: "visible" }, "<")
        .to(bigImageRef.current, {
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        }, "<")
        .to(headerRefs.current, { visibility: "visible" }, "<")
        .to(headerRefs.current, {
          yPercent: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        }, "<");
    } else {
      tl.to(thumbRefs.current, { visibility: "visible" })
        .to(thumbRefs.current, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          ease: "power3.out",
        }, "<")
        .to(bigImageRef.current, { visibility: "visible" })
        .to(bigImageRef.current, {
          yPercent: 0,
          duration: 1.6,
          ease: "power4.out",
        }, "<")
        .to(headerRefs.current, { visibility: "visible" }, "-=1.3")
        .to(headerRefs.current, {
          yPercent: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        }, "<");
    }
    return tl;
  };

  useGSAP(() => {
    setInitial();
    enter();
  }, []);

  return (
    <Layout>
      <Cursor hovered={false} />
      <div className="flex flex-col">
        <Header active="selected" addRef={addHeaderRef} />
        <div className="flex w-full mb-6 justify-center mt-12">
          <div
            className="w-[90vw] flex items-start relative invisible overflow-hidden md:w-[80vw] h-[65vh] md:h-[75vh]"
            ref={bigImageRef}
          >
            <Image
              src={selectedFull[current]}
              fill
              sizes="100vw"
              priority
              className="self-end object-contain object-center block"
              alt="Selected Image"
            />
          </div>
        </div>
        <motion.div
          style={{ zIndex: 15 }}
          ref={stripRef}
          className="noScrollBar w-full fixed h-[100vh] top-0 bottom-0 pt-[calc(100svh-80px)] pl-5 flex gap-2 overflow-x-auto overflow-y-hidden z-50 pr-[calc(100vw-48px)]"
        >
          {selectedThumbs.map((src, i) => (
            <motion.div
              key={i}
              data-index={i}
              ref={addThumbRef}
              className="invisible relative max-h-16 min-w-12 image-slide"
            >
              <Image
                src={src}
                fill
                sizes="10vw"
                className="object-cover object-top block"
                alt={`Fotografia ${i + 1}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}
