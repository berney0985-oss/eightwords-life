import type { ReactNode } from "react";

/** 內容頁統一容器：手機優先、閱讀寬度、留白節奏。 */
export function PageContainer({
  children,
  width = "default",
}: {
  children: ReactNode;
  width?: "default" | "narrow" | "wide";
}) {
  const maxWidth =
    width === "narrow"
      ? "max-w-2xl"
      : width === "wide"
        ? "max-w-6xl"
        : "max-w-4xl";

  return (
    <div className={`mx-auto w-full ${maxWidth} px-4 py-12 sm:px-6 sm:py-16`}>
      {children}
    </div>
  );
}
