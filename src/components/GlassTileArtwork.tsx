import { asset } from "../lib/assets";

const XS = [-20, 79, 178, 277, 376, 475];
const YS = [-20, 79, 178, 277, 376];

/** Light-blue "glass tile" panel with warm + blue glows, used behind the hero and About artwork. */
export function GlassTileArtwork({
  width,
  height,
  warmTop,
  blueLeft,
}: {
  width: number;
  height: number;
  warmTop: number;
  blueLeft: number;
}) {
  return (
    <div
      className="absolute left-0 top-0 overflow-hidden rounded-[32px] bg-tint-blue"
      style={{ width, height }}
      aria-hidden="true"
    >
      <div className="absolute left-[-100px] size-[300px]" style={{ top: warmTop }}>
        <div className="absolute inset-[-26.67%]">
          <img src={asset("warm-glow.svg")} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <div className="absolute top-[-100px] size-[440px]" style={{ left: blueLeft }}>
        <div className="absolute inset-[-25%]">
          <img src={asset("blue-glow.svg")} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      {YS.flatMap((y) =>
        XS.map((x) => (
          <div
            key={`${x}-${y}`}
            className="absolute size-[95.94px] rounded-[10.338px] bg-[rgba(255,255,255,0.01)]"
            style={{ left: x, top: y }}
          />
        )),
      )}
    </div>
  );
}
