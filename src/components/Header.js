import Link from "next/link";
import { site } from "../data/images";

// Header di navigazione comune (home, /selected, /about): titolo del sito a
// sinistra, Overview/Selected/About a destra, voce attiva sottolineata. Gli
// elementi nascono `invisible` e vengono raccolti via `addRef` dalla timeline
// GSAP di ingresso della pagina che lo monta. Su /about l'header è `fixed`.
export default function Header({ active, addRef, fixed = false }) {
  const linkClass = (page) => (active === page ? "underline" : "headerLink");

  return (
    <div
      style={{ zIndex: 9999, fontSize: "0.8rem" }}
      className={`${fixed ? "fixed top-0 " : ""}px-5 py-3 flex font-medium items-center uppercase w-full`}
    >
      <div className="w-6/12 flex overflow-hidden">
        <div className="invisible" ref={addRef}>
          <Link href="/" className="text-nowrap font-monoton font-normal">{site.title}</Link>
        </div>
      </div>
      <div className="w-6/12 flex justify-between overflow-hidden">
        {/* Sotto md la voce Overview non c'è. Su /about sparisce l'intero
            wrapper (le due voci restanti si distribuiscono), sulle altre
            pagine solo il link (tre slot, Selected resta centrato):
            differenza storica del layout, preservata. */}
        {fixed ? (
          <div className="invisible hidden md:inline-block" ref={addRef}>
            <Link href="/" className={linkClass("overview")}>Overview</Link>
          </div>
        ) : (
          <div className="invisible" ref={addRef}>
            <Link href="/" className={`${linkClass("overview")} hidden md:block`}>Overview</Link>
          </div>
        )}
        <div className="invisible" ref={addRef}>
          <Link href="/selected" className={linkClass("selected")}>Selected</Link>
        </div>
        <div className="invisible" ref={addRef}>
          <Link href="/about" className={linkClass("about")}>About</Link>
        </div>
      </div>
    </div>
  );
}
