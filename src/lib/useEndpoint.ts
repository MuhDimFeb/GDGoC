import { useCallback, useEffect, useState } from "react";
import { getJson } from "./api";

export type RequestState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

export interface Endpoint<T> {
  state: RequestState<T>;
  retry: () => void;
}

export function useEndpoint<T>(path: string): Endpoint<T> {
  const [state, setState] = useState<RequestState<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ status: "loading" });
    getJson<T>(path)
      .then((data) => active && setState({ status: "success", data }))
      .catch((error: unknown) => {
        if (!active) return;
        const message = error instanceof Error ? error.message : "Something went wrong.";
        // fetch() rejects with a bare TypeError for network/CORS failures.
        setState({
          status: "error",
          message: message === "Failed to fetch" ? "The API couldn’t be reached." : message,
        });
      });
    return () => {
      active = false;
    };
  }, [path, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { state, retry };
}
