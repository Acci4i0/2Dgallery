import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Cursore custom: pallino bianco 15px mix-blend-difference che segue il mouse
// con spring (damping 20, stiffness 300, mass 0.5); 30px quando hovered.
export default function Cursor({ hovered }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 7.5);
      y.set(e.clientY - 7.5);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div>
      <motion.div
        style={{
          left: springX,
          top: springY,
          zIndex: 11000,
          width: hovered ? 30 : 15,
          height: hovered ? 30 : 15,
          transition: "width 0.5s ease, height 0.5s ease",
        }}
        className="fixed bg-white mix-blend-difference hidden md:block rounded-full pointer-events-none"
      />
    </div>
  );
}
