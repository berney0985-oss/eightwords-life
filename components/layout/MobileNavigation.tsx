"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation, primaryCta } from "@/data/navigation";

/** 手機版導覽：簡潔漢堡選單。全站僅此與測驗／結果為 client 區塊。 */
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "關閉選單" : "開啟選單"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-sm text-ink"
      >
        <span aria-hidden="true" className="relative block h-3.5 w-5">
          <span
            className={`absolute left-0 top-0 h-px w-full bg-current transition-transform ${
              open ? "top-1/2 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-px w-full bg-current transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform ${
              open ? "bottom-1/2 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="主導覽"
          className="absolute inset-x-0 top-16 border-b border-mist bg-paper shadow-sm"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`block border-b border-mist py-3 text-base ${
                    pathname === item.href
                      ? "font-medium text-ink"
                      : "text-graphite"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link
                href={primaryCta.href}
                onClick={() => setOpen(false)}
                className="block rounded-sm bg-ink px-4 py-3 text-center text-base text-paper"
              >
                {primaryCta.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
