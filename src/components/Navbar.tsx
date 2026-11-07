import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { asset } from "../lib/assets";
import { cn } from "../lib/cn";
import { resolveNav, useNavItems } from "../lib/navigation";
import { Button, Interactive } from "./ui";

export function Navbar() {
  const items = useNavItems();
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);

  // Close the mobile menu after any navigation.
  useEffect(() => setOpen(false), [pathname, hash]);

  const links = items.map((item) => (
    <Interactive
      key={item.href}
      {...resolveNav(item.href)}
      className={cn(
        "rounded-full px-5 py-[14px] text-base transition-colors",
        item.href === pathname && !hash
          ? "bg-tint-blue font-bold text-brand-blue-dark"
          : "text-muted hover:bg-surface",
      )}
    >
      {item.label}
    </Interactive>
  ));

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex h-[104px] max-w-[1440px] items-center justify-between gap-4 px-6 xl:px-16">
        <Link to="/" aria-label="GDGoC UGM – home" className="flex shrink-0 items-center gap-[11.312px]">
          <img
            src={asset("logo-mark.png")}
            alt=""
            width={69.12}
            height={38.218}
            className="h-[38.4px] w-[69.12px]"
          />
          <img
            src={asset("logo-text.svg")}
            alt="Google Developer Groups On Campus • Universitas Gadjah Mada"
            className="hidden h-auto w-[265.142px] sm:block"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-2 xl:flex">
          {links}
        </nav>

        <Button to="/#tracks" className="hidden xl:inline-flex">
          Find your track
        </Button>

        <button
          type="button"
          className="inline-flex size-12 items-center justify-center rounded-lg border border-line text-ink xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-6 pb-6 pt-4 xl:hidden">
          <nav aria-label="Primary" className="flex flex-col gap-1">
            {links}
          </nav>
          <Button to="/#tracks" className="mt-4 w-full justify-center">
            Find your track
          </Button>
        </div>
      )}
    </header>
  );
}
