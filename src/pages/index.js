import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Cursor from "../components/Cursor";
import Preloader from "../components/Preloader";
import ProjectDetails from "../components/ProjectDetails";
import useRefCollector from "../hooks/useRefCollector";
import { overviewImages, findProjectByThumb } from "../data/images";

// Flag a livello di modulo: il preloader appare solo al primo mount
// (full reload). Le navigazioni SPA successive non lo mostrano.
let hasPageLoaded = false;

export default function Home() {
  const counterRef = useRef(null);
  const [headerRefs, addHeaderRef] = useRefCollector();
  const [imageRefs, addImageRef] = useRefCollector();

  useEffect(() => {
    if (!hasPageLoaded) hasPageLoaded = true;
  }, []);

  const setInitial = () => {
    gsap.set(headerRefs.current, { yPercent: 100 });
    gsap.set(imageRefs.current, { yPercent: 250, opacity: 0 });
  };

  const enter = () => {
    const tl = gsap.timeline({});
    if (counterRef.current) {
      // Con preloader: il contatore resta su 100 e vola in alto, poi entrano
      // griglia e header in overlap.
      tl.to(counterRef.current, {
        delay: 1.7,
        duration: 1.3,
        yPercent: -150,
        opacity: 0,
        ease: "power3.inOut",
      }, "<")
        .to(imageRefs.current, { visibility: "visible" }, "-=0.5")
        .to(imageRefs.current, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.01,
          ease: "power3.out",
        }, "<")
        .to(headerRefs.current, { visibility: "visible" }, "-=1")
        .to(headerRefs.current, {
          yPercent: 0,
          duration: 1,
          ease: "power2.out",
        }, "<");
    } else {
      // Senza preloader (ritorno via SPA): stesse animazioni, nessun delay.
      tl.to(imageRefs.current, { visibility: "visible" })
        .to(imageRefs.current, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.01,
          ease: "power3.out",
        }, "<")
        .to(headerRefs.current, { visibility: "visible" }, "<")
        .to(headerRefs.current, {
          yPercent: 0,
          duration: 1,
          ease: "power2.out",
        }, "<");
    }
    return tl;
  };

  useGSAP(() => {
    setInitial();
    enter();
  }, []);

  const [openDetails, setOpenDetails] = useState(false);
  const [project, setProject] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hovered, setHovered] = useState(false);

  return (
    <Layout>
      <Cursor hovered={hovered} />
      {openDetails && (
        <ProjectDetails project={project} setOpenDetails={setOpenDetails} />
      )}
      <div className="flex flex-col noScrollBar">
        <Header active="overview" addRef={addHeaderRef} />
        <div className="mb-44">
          {!hasPageLoaded && <Preloader ref={counterRef} />}
          <div className="flex flex-col gap-16 px-5 pt-8 md:pt-16 noScrollBar">
            <div className="w-full noScrollBar grid grid-cols-3 gap-x-4 gap-y-8 md:flex md:flex-wrap md:gap-x-12 md:gap-y-12 justify-between">
              {overviewImages.map((src, i) => (
                <div
                  key={i}
                  ref={addImageRef}
                  onClick={() => {
                    setProject(findProjectByThumb(src));
                    setOpenDetails(true);
                  }}
                  onMouseEnter={() => {
                    setHovered(true);
                    setHoverIndex(i);
                  }}
                  onMouseLeave={() => {
                    setHovered(false);
                    setHoverIndex(null);
                  }}
                  className="cursor-pointer w-28 h-36 md:w-36 md:h-44 invisible overflow-hidden relative"
                >
                  <Image
                    style={{
                      opacity: hoverIndex === i ? 0.7 : 1,
                      transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    src={src}
                    sizes="10vw"
                    className="object-cover"
                    fill
                    alt={`Fotografia ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
