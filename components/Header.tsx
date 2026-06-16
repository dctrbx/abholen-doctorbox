"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Search } from "@/components/Search";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "So funktioniert's", href: "/#ablauf" },
  { label: "Tests", href: "/#tests" },
  { label: "Abholen", href: "/#abholen" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll sperren, wenn Mobile-Menü offen ist.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mt-3 flex items-center justify-between rounded-full bg-soft/80 px-4 py-2.5 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5",
            scrolled
              ? "shadow-[0_8px_30px_-14px_rgba(20,19,16,0.35)]"
              : "shadow-[0_4px_20px_-16px_rgba(20,19,16,0.4)]",
          )}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              aria-label="DoctorBox Startseite"
              className="flex items-center"
            >
              <Logo className="h-9 sm:h-10" />
            </Link>
            <span
              aria-hidden="true"
              className="h-7 w-px bg-ink/20 sm:h-8"
            />
            <span className="text-h7 font-semibold tracking-tight text-moss">
              Pick-up
            </span>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-h8 font-medium text-ink/80 transition-colors hover:bg-moss/5 hover:text-moss"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:block">
              <Button href="/#tests" size="md">
                Test abholen
              </Button>
            </div>

            {/* Mobile-Toggle */}
            <button
              type="button"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-moss transition-colors hover:bg-moss/5 md:hidden"
            >
            <span className="relative flex h-4 w-6 flex-col justify-between">
              <span
                className={cn(
                  "h-0.5 w-full rounded-full bg-current transition-transform duration-300",
                  open && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full rounded-full bg-current transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full rounded-full bg-current transition-transform duration-300",
                  open && "-translate-y-[7px] -rotate-45",
                )}
              />
            </span>
            </button>
          </div>
        </div>

        {/* Suchleiste – eigene, zentrierte Reihe; blendet beim Scrollen aus */}
        <div
          className={cn(
            "flex justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "pointer-events-none mt-0 max-h-0 -translate-y-2 overflow-hidden opacity-0"
              : "mt-2 max-h-20 translate-y-0 overflow-visible opacity-100 sm:mt-2.5",
          )}
          aria-hidden={scrolled}
        >
          <div className="w-full max-w-xl">
            <Search />
          </div>
        </div>
      </div>

      {/* Mobile-Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 origin-top bg-soft px-6 pt-24 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-h8 font-semibold uppercase tracking-[0.14em] text-ink/40">
            Menü
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menü schließen"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-moss transition-colors hover:bg-moss/5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 py-4 text-h4 font-semibold text-moss"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <Button href="/#tests" className="w-full" onClick={() => setOpen(false)}>
            Test abholen
          </Button>
        </div>
      </div>
    </header>
  );
}
