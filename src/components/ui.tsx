import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { asset } from "../lib/assets";
import { cn } from "../lib/cn";

export interface Target {
  /** In-app route, e.g. "/about" or "/#tracks". */
  to?: string;
  /** External URL – opens in a new tab. */
  href?: string;
  onClick?: () => void;
}

export function Interactive({
  to,
  href,
  onClick,
  className,
  children,
}: Target & { className?: string; children: ReactNode }) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-12 xl:px-24", className)}>
      {children}
    </div>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...target
}: Target & { variant?: "primary" | "secondary"; className?: string; children: ReactNode }) {
  return (
    <Interactive
      {...target}
      className={cn(
        "inline-flex h-[52px] shrink-0 items-center gap-4 whitespace-nowrap rounded-lg border px-6 text-base font-medium transition-colors",
        variant === "primary"
          ? "border-transparent bg-brand-blue text-white hover:bg-[#3470d9]"
          : "border-line bg-white text-brand-blue-dark hover:bg-tint-blue",
        className,
      )}
    >
      {children}
      <img
        src={asset(variant === "primary" ? "arrow-white.svg" : "arrow-blue.svg")}
        alt=""
        width={20}
        height={20}
        className="size-5"
      />
    </Interactive>
  );
}

export function TextLink({
  className,
  children,
  ...target
}: Target & { className?: string; children: ReactNode }) {
  return (
    <Interactive
      {...target}
      className={cn(
        "group inline-flex items-center gap-3 text-left text-base font-medium text-brand-blue-dark",
        className,
      )}
    >
      <span className="group-hover:underline">{children}</span>
      <img src={asset("arrow-blue.svg")} alt="" width={20} height={20} className="size-5 shrink-0" />
    </Interactive>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-[10px]">
      <img src={asset("marker.svg")} alt="" width={7} height={7} className="size-[7px] shrink-0" />
      <p className="text-xs font-medium uppercase text-muted">{children}</p>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-lg bg-surface", className)} />;
}
