import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Layout from "../components/Layout";
import Cursor from "../components/Cursor";
import ProjectDetails from "../components/ProjectDetails";
import { overviewImages, findProjectByThumb, site } from "../data/images";

// Contatore preloader: step non lineari avanzati ogni 100ms (0 -> 100 in 1.6s)
const COUNTER_STEPS = [0, 7, 15, 21, 30, 38, 45, 55, 63, 73, 74, 80, 86, 91, 98, 99, 100];

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

// Flag a livello di modulo: il preloader appare solo al primo mount
// (full reload). Le navigazioni SPA successive non lo mostrano.
export let hasPageLoaded = false;

export default function Home() {
  gsap.registerPlugin(useGSAP);

  const counterRef = useRef(null);
  const headerRefs = useRef([]);
  const imageRefs = useRef([]);

  const collect = (store) => (el) => {
    if (el && !store.current.includes(el)) store.current.push(el);
  };
  const addImageRef = collect(imageRefs);
  const addHeaderRef = collect(headerRefs);

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
        <div
          style={{ zIndex: 9999, fontSize: "0.8rem" }}
          className="px-5 py-3 flex font-medium items-center uppercase w-full"
        >
          <div className="w-6/12 flex overflow-hidden">
            <div className="invisible" ref={addHeaderRef}>
              <Link href="/" className="text-nowrap">{site.title}</Link>
            </div>
          </div>
          <div className="w-6/12 flex justify-between overflow-hidden">
            <div className="invisible" ref={addHeaderRef}>
              <Link href="/" className="underline hidden md:block">Overview</Link>
            </div>
            <div className="invisible" tabIndex="0" ref={addHeaderRef}>
              <Link href="/selected" className="headerLink">Selected</Link>
            </div>
            <div className="invisible" tabIndex="0" ref={addHeaderRef}>
              <Link href="/about" className="headerLink ">About</Link>
            </div>
          </div>
        </div>
        <div className="mb-44">
          {!hasPageLoaded && (
            <div
              ref={counterRef}
              className="fixed top-0 pl-1 w-full flex uppercase text-7xl"
            >
              <div className="w-8/12">
                <Counter />
              </div>
              <div className="w-4/12">100</div>
            </div>
          )}
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
                    alt={src}
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
