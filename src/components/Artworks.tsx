import { asset } from "../lib/assets";
import { cn } from "../lib/cn";

const Fill = ({ src }: { src: string }) => (
  <img src={asset(src)} alt="" className="block size-full max-w-none" />
);

interface ArtworkProps {
  /** Positioning + size of the artwork box, e.g. "left-[70px] top-[-4px] size-[257px]". */
  className: string;
}

/** "Research" illustration (magnifier). `prefix` selects the hero or track-card export. */
export function ResearchArtwork({ prefix, className }: ArtworkProps & { prefix: "hero-research" | "track-research" }) {
  return (
    <div className={cn("absolute", className)} aria-hidden="true">
      <div className="absolute left-[calc(50%-0.06px)] top-[calc(50%-0.06px)] size-[98%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-[24.5%] top-[12.5%] size-[76.5%]">
          <div className="absolute inset-[-5.23%]">
            <Fill src={`${prefix}-1.svg`} />
          </div>
        </div>
        <div className="absolute bottom-[12.5%] left-[12.5%] right-1/4 top-1/4">
          <div className="absolute inset-[-3.2%_-6.4%_-9.6%_-6.4%]">
            <Fill src={`${prefix}-2.svg`} />
          </div>
        </div>
        <div className="absolute inset-[33.07%_17.27%_14.55%_18.75%]">
          <div className="absolute inset-[-3.82%_-6.25%_-11.46%_-6.25%]">
            <Fill src={`${prefix}-3.svg`} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** "Design" illustration (palette). */
export function DesignArtwork({ className }: ArtworkProps) {
  return (
    <div className={cn("absolute", className)} aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[12.45%_-1.85%_10.51%_24.81%]">
          <div className="absolute inset-[-3.71%]">
            <Fill src="track-design-1.svg" />
          </div>
        </div>
        <div className="absolute inset-[21.4%_20.62%_4.28%_5.06%]">
          <div className="absolute inset-[0_-0.56%_-2.82%_-0.9%]">
            <Fill src="track-design-2.svg" />
          </div>
        </div>
        <div
          className="absolute inset-[32.42%_20.72%_10.63%_27.1%] flex items-center justify-center"
          style={{ containerType: "size" }}
        >
          <div className="flex-none -scale-x-100" style={{ height: "100cqh", width: "100cqw" }}>
            <div className="relative size-full">
              <img src={asset("track-design-3.svg")} alt="" className="absolute inset-0 block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** "Development" illustration (code window). `prefix` selects the hero or track-card export. */
export function DevelopmentArtwork({ prefix, className }: ArtworkProps & { prefix: "hero-dev" | "track-dev" }) {
  return (
    <div className={cn("absolute", className)} aria-hidden="true">
      <div className="absolute inset-[12.5%_-2%_24.5%_11%]">
        <div className="absolute inset-[-6.22%_-4.31%]">
          <Fill src={`${prefix}-1.svg`} />
        </div>
      </div>
      <div className="absolute inset-[24.12%_17.51%_8.17%_7.78%]">
        <div className="absolute inset-[-2.89%_-5.25%_-8.68%_-5.25%]">
          <Fill src={`${prefix}-2.svg`} />
        </div>
      </div>
      <div className="absolute inset-[31.91%_24.8%_43.55%_34.63%]">
        <div className="absolute inset-[-17.83%_-15.61%_-33.8%_-15.61%]">
          <Fill src={`${prefix}-3.svg`} />
        </div>
      </div>
    </div>
  );
}

/** Illustration for a track card, chosen by the API's track id. */
export function TrackArtwork({ id }: { id: string }) {
  switch (id) {
    case "design-creativity":
      return <DesignArtwork className="left-[70px] top-[-4px] size-[252px]" />;
    case "development":
      return <DevelopmentArtwork prefix="track-dev" className="left-[70px] top-[-4px] size-[257.16px]" />;
    default:
      return <ResearchArtwork prefix="track-research" className="left-[70px] top-[-4px] size-[257.16px]" />;
  }
}

export function trackTint(id: string): string {
  switch (id) {
    case "design-creativity":
      return "bg-tint-yellow";
    case "development":
      return "bg-tint-green";
    default:
      return "bg-tint-blue";
  }
}
