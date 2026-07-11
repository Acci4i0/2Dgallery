import { motion } from "framer-motion";

// Transizione pagina (identica al riferimento):
// - contenuto in uscita: scale 0.9, y -150, opacity 0.5 in 1.2s, ease [0.76, 0, 0.24, 1]
// - pannello bianco che sale da sotto: y 100vh -> 0 in 1s, stessa ease
const contentVariants = {
  initial: { scale: 1, y: 0 },
  enter: { scale: 1, y: 0 },
  exit: {
    scale: 0.9,
    y: -150,
    opacity: 0.5,
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
  },
};

const slideVariants = {
  initial: { y: "100vh" },
  enter: { y: "100vh" },
  exit: {
    y: 0,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};

const anim = (variants) => ({
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants,
});

export default function Layout({ children }) {
  return (
    <div className="bg-white">
      <motion.div
        style={{ zIndex: 12000 }}
        className="h-screen w-full fixed left-0 top-0 bg-white"
        {...anim(slideVariants)}
      />
      <motion.div className="origin-top" {...anim(contentVariants)}>
        {children}
      </motion.div>
    </div>
  );
}
