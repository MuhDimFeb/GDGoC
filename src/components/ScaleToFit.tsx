import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Lays children out at their exact Figma size and scales the whole box down
 * (never up) when the column is narrower – so absolutely positioned artwork
 * keeps its proportions on small screens.
 */
export function ScaleToFit({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / width));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="w-full" style={{ height: height * scale, maxWidth: width }}>
      <div
        className="relative"
        style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}
