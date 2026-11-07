import type { ReactNode } from "react";
import type { Endpoint } from "../lib/useEndpoint";

interface AsyncProps<T> {
  endpoint: Endpoint<T>;
  skeleton: ReactNode;
  children: (data: T) => ReactNode;
}

/** Renders a skeleton while loading, a retry notice on failure, and the data once it arrives. */
export function Async<T>({ endpoint, skeleton, children }: AsyncProps<T>) {
  const { state, retry } = endpoint;

  if (state.status === "loading") return <>{skeleton}</>;

  if (state.status === "error") {
    return (
      <div role="alert" className="w-full rounded-2xl border border-line bg-tint-red p-6">
        <p className="text-base font-medium text-ink">We couldn’t load this section.</p>
        <p className="mt-1 text-sm text-muted">{state.message} Check your connection and try again.</p>
        <button
          type="button"
          onClick={retry}
          className="mt-4 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-brand-blue-dark hover:bg-tint-blue"
        >
          Try again
        </button>
      </div>
    );
  }

  return <>{children(state.data)}</>;
}
