import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Cursor from "../components/Cursor";
import useRefCollector from "../hooks/useRefCollector";
import { biopic, site } from "../data/images";

// Placeholder "clienti": riquadri con effetto crocini di stampa.
// Sostituisci le etichette (o inserisci <img> di loghi tuoi) qui.
const clients = [
  "Cliente Uno",
  "Cliente Due",
  "Cliente Tre",
  "Cliente Quattro",
  "Cliente Cinque",
  "Cliente Sei",
  "Cliente Sette",
  "Cliente Otto",
  "Cliente Nove",
];

// Header di /about: fixed, con la sua timeline di ingresso indipendente
// (yPercent 100 -> 0, durata 1s, stagger 0.05, power2.out).
function AboutHeader() {
  const [linkRefs, addRef] = useRefCollector();

  const setInitial = () => {
    gsap.set(linkRefs.current, { yPercent: 100 });
  };

  const enter = () => {
    gsap
      .timeline({})
      .to(linkRefs.current, { visibility: "visible" })
      .to(linkRefs.current, {
        yPercent: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
      }, "<");
  };

  useGSAP(() => {
    setInitial();
    enter();
  }, []);

  return <Header active="about" fixed addRef={addRef} />;
}

export default function About() {
  const [contentRefs, addContentRef] = useRefCollector();
  const [footerLeftRefs, addFooterLeftRef] = useRefCollector();
  const [footerRightRefs, addFooterRightRef] = useRefCollector();

  const setInitial = () => {
    gsap.set(contentRefs.current, { yPercent: 100 });
    gsap.set(footerLeftRefs.current, { yPercent: 100 });
    gsap.set(footerRightRefs.current, { yPercent: 100 });
  };

  const enter = () => {
    gsap
      .timeline({})
      .to(contentRefs.current, { visibility: "visible" })
      .to(contentRefs.current, {
        yPercent: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
      }, "<")
      .to(footerLeftRefs.current, { visibility: "visible" }, "-=0.3")
      .to(footerRightRefs.current, { visibility: "visible" }, "<")
      .to(footerLeftRefs.current, {
        yPercent: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
      }, "<")
      .to(footerRightRefs.current, {
        yPercent: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
      }, "<");
  };

  useGSAP(() => {
    setInitial();
    enter();
  }, []);

  return (
    <Layout>
      <Cursor hovered={false} />
      <AboutHeader />
      <div
        style={{ zIndex: 10 }}
        className="h-screen absolute md:overflow-hidden inset-0 w-full flex justify-between items-center"
      >
        <div className="h-[80vh] flex flex-col md:flex-row px-5">
          <div
            className="w-full h-[40vh] md:hidden flex relative overflow-hidden flex-shrink-0"
            ref={addContentRef}
          >
            <Image src={biopic} alt="biopic" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="w-full md:w-6/12 flex md:overflow-hidden">
            <div
              ref={addContentRef}
              className="flex flex-col pt-4 md:pt-0 w-12/12 justify-between"
            >
              <div className="flex flex-col">
                <div className="text-xl md:text-2xl font-bold mb-2 tracking-tighter">
                  {site.title}
                </div>
                <div className="w-full md:w-10/12 font-light text-base">
                  Testo bio placeholder: presentati qui in poche righe. Racconta
                  chi sei, dove lavori e che tipo di fotografia ami fare.
                  <br />
                  <br />
                  Seconda parte del testo: ispirazioni, progetti personali e un
                  invito a scriverti. Sostituisci questo testo in src/pages/about.js.
                </div>
              </div>
              <div className="flex flex-col pt-4 md:pt-0 mb-12 md:mb-0">
                <div className="uppercase mb-4 text-xl md:text-2xl tracking-tighter font-bold">
                  Selected Clients
                </div>
                <div className="grid grid-cols-2  md:flex md:flex-wrap gap-4">
                  {clients.map((name, i) => (
                    <div
                      key={i}
                      className="p-[12vw] sm:p-[16vw] md:p-4 div-with-borders flex items-center justify-center"
                    >
                      <span className="uppercase text-xs whitespace-nowrap">{name}</span>
                      <div className="border-left" />
                      <div className="border-right" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full md:w-6/12 hidden md:block relative overflow-hidden"
            ref={addContentRef}
          >
            <Image src={biopic} alt="biopic" fill sizes="100vw" className="object-cover" />
          </div>
        </div>
      </div>
      <div
        style={{ zIndex: 9999, fontSize: "0.8rem" }}
        className="fixed bottom-0 w-full flex uppercase pb-2 px-5"
      >
        <div className="w-6/12 flex flex-col justify-end">
          <div className="overflow-hidden ">
            <div className="invisible flex justify-between" ref={addFooterLeftRef}>
              <a href={`mailto:${site.email}`} className="headerLink">
                {site.email}
              </a>
            </div>
          </div>
        </div>
        <div className="w-6/12 flex gap-2">
          <div className="w-4/12 hidden md:flex justify-end flex-col">
            <div className="overflow-hidden flex justify-start">
              <div className="invisible" ref={addFooterRightRef}>
                <a href={site.creditsUrl} target="_blank" rel="noreferrer" className="">
                  {site.credits}
                </a>
              </div>
            </div>
          </div>
          <div className="w-6/12 md:w-4/12 flex justify-end flex-col">
            <div className="overflow-hidden flex justify-end">
              <div className="invisible" ref={addFooterRightRef}>
                <a href={site.instagram} target="_blank" rel="noreferrer" className="headerLink">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="w-6/12 md:w-4/12 flex justify-end flex-col">
            <div className="overflow-hidden flex justify-end">
              <div className="invisible" ref={addFooterRightRef}>
                <a href={site.extraUrl} target="_blank" rel="noreferrer" className="headerLink">
                  {site.extraLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
