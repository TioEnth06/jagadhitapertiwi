"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useSubView<T extends string>(
  basePath: string,
  validViews: readonly T[],
  paramName = "view",
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams?.get(paramName) ?? null;
  const view = validViews.includes(raw as T) ? (raw as T) : null;

  return {
    view,
    openView: (next: T) => router.push(`${basePath}?${paramName}=${next}`),
    backToMenu: () => router.push(basePath),
  };
}
