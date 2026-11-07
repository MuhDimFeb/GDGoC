import { Link } from "react-router-dom";
import { asset } from "../lib/assets";
import { FALLBACK_TAGLINE, INSTAGRAM_HANDLE, YOUTUBE_URL, instagramUrl } from "../lib/links";
import { resolveNav, useNavItems } from "../lib/navigation";
import type { Stats } from "../lib/types";
import { useEndpoint } from "../lib/useEndpoint";
import { Container, Interactive } from "./ui";

export function Footer() {
  const items = useNavItems();
  const { state } = useEndpoint<Stats>("/stats");
  const handle = state.status === "success" ? state.data.social.instagram : INSTAGRAM_HANDLE;
  const tagline = state.status === "success" ? state.data.tagline : FALLBACK_TAGLINE;

  return (
    <footer className="bg-surface">
      <Container className="flex flex-col gap-10 pb-7 pt-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex w-full max-w-[480px] flex-col gap-6">
            <Link to="/" aria-label="GDGoC UGM – home" className="flex items-center gap-[12.49px]">
              <img
                src={asset("logo-mark-footer.png")}
                alt=""
                width={76.32}
                height={42.199}
                className="h-[42.4px] w-[76.32px]"
              />
              <img
                src={asset("logo-text-footer.svg")}
                alt="Google Developer Groups On Campus • Universitas Gadjah Mada"
                className="hidden h-auto w-[292.761px] sm:block"
              />
            </Link>
            <p className="text-base leading-[1.55] text-muted">
              A student community for curious minds, shared learning, and technology with purpose.
            </p>
          </div>

          <nav aria-label="Footer" className="flex w-[150px] flex-col gap-[14px]">
            <p className="text-base font-bold text-black">Explore</p>
            {items.map((item) => (
              <Interactive
                key={item.href}
                {...resolveNav(item.href)}
                className="w-fit text-[15px] text-muted hover:text-ink hover:underline"
              >
                {item.label}
              </Interactive>
            ))}
          </nav>

          <div className="flex w-full flex-col gap-4 md:w-[260px]">
            <p className="text-base font-bold text-black">Keep in the loop</p>
            <a
              href={instagramUrl(handle)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-[18px] text-brand-blue-dark hover:underline"
            >
              {handle}
            </a>
            <div className="flex items-start gap-4">
              <a
                href={instagramUrl(handle)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GDGoC UGM on Instagram"
                className="relative block size-6"
              >
                <span className="absolute inset-[14.58%]">
                  <span className="absolute inset-[-4.41%]">
                    <img src={asset("instagram.svg")} alt="" className="block size-full max-w-none" />
                  </span>
                </span>
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GDGoC UGM on YouTube"
                className="relative block size-6"
              >
                <span className="absolute inset-[20.91%_10.21%]">
                  <span className="absolute inset-[-5.37%_-3.93%]">
                    <img src={asset("youtube.svg")} alt="" className="block size-full max-w-none" />
                  </span>
                </span>
              </a>
            </div>
            <p className="text-sm leading-[1.55] text-muted">{tagline}</p>
          </div>
        </div>

        <div className="h-px w-full bg-line" />

        <div className="flex flex-col gap-2 text-xs text-muted md:flex-row md:justify-between">
          <p>© GDGoC Universitas Gadjah Mada • 2026/2027</p>
          <p>Made for the campus. Open to possibilities.</p>
        </div>

        <div className="flex h-1 w-[160px]" aria-hidden="true">
          <div className="h-1 flex-1 bg-brand-blue" />
          <div className="h-1 flex-1 bg-brand-red" />
          <div className="h-1 flex-1 bg-brand-yellow" />
          <div className="h-1 flex-1 bg-brand-green" />
        </div>
      </Container>
    </footer>
  );
}
