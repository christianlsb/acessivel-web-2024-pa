import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

export default function useBreakpoints(extended = false) {
  dynamic(() => import("match-media"), { ssr: false });

  const [breakpoint, setBreakpoint] = useState<Breakpoint>();

  useEffect(() => {
    const getBreakpoint = () => {
      if (matchMedia("(max-width: 1023px)").matches) setBreakpoint("mobile");
      else if (matchMedia("(max-width: 1023px)").matches)
        setBreakpoint("tablet");
      else if (extended && matchMedia("(max-width: 1439px)").matches)
        setBreakpoint("notebook");
      else setBreakpoint("desktop");
    };
    getBreakpoint();
    window.addEventListener("resize", getBreakpoint);
    return () => window.removeEventListener("resize", getBreakpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return breakpoint;
}
