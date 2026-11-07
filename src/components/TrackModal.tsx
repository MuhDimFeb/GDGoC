import { useEffect, useRef } from "react";
import { instagramUrl } from "../lib/links";
import type { Track } from "../lib/types";
import { Button } from "./ui";

/** Details for one learning track, opened from "Explore this track". */
export function TrackModal({ track, onClose }: { track: Track; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="track-modal-title"
        className="max-h-full w-full max-w-[560px] overflow-y-auto rounded-3xl bg-white p-7 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] font-medium uppercase text-brand-blue-dark">{track.tagline}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-2 inline-flex size-10 items-center justify-center rounded-full text-muted hover:bg-surface"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <h2 id="track-modal-title" className="mt-4 text-[28px] font-bold leading-[1.12] text-ink">
          {track.name}
        </h2>
        <p className="mt-4 text-base leading-[1.55] text-muted">{track.description}</p>

        <ul className="mt-6 flex flex-wrap gap-3">
          {track.skills.map((skill) => (
            <li key={skill} className="rounded-full bg-surface px-[14px] py-2 text-[13px] font-bold text-muted">
              {skill}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-base leading-[1.55] text-ink">{track.what_you_do}</p>

        <div className="mt-6 flex items-center gap-2 text-sm text-muted">
          <span className={track.open ? "size-2 rounded-full bg-brand-green" : "size-2 rounded-full bg-line"} />
          {track.open ? "Open for recruitment" : "Not recruiting right now"}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={instagramUrl()}>Ask about this track</Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
