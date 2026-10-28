"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./edorax-landing.module.css";

// Plays the help ladder's rise once it scrolls into view. Without JavaScript the
// bars simply show, because they only hide after this has mounted.
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setArmed(true);
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={s.reveal} data-armed={armed} data-shown={shown}>
      {children}
    </div>
  );
}
