import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string; // Added className
  style?: React.CSSProperties; // Added style
}

export default function ScrollReveal({
  children,
  width = "100%",
  delay = 0,
  direction = "up",
  distance = 30,
  className = "",
  style = {},
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <div ref={ref} className={className} style={{ width, position: "relative", ...style }}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
