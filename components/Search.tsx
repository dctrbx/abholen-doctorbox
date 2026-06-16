"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import type { SearchDoc } from "@/lib/shopify-search";
import { cn } from "@/lib/cn";

const SUGGESTIONS = ["Vitamin D", "Schilddrüse", "Testosteron", "Ferritin", "STI"];

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

type Result = { doc: SearchDoc; score: number; bios: string[] };

function rank(index: SearchDoc[], query: string): Result[] {
  const tokens = norm(query)
    .split(/\s+/)
    .filter((t) => t.length >= 2);
  if (tokens.length === 0) return [];

  const out: Result[] = [];
  for (const doc of index) {
    const title = norm(doc.title);
    const bios = doc.biomarkers.map(norm);
    const cat = norm(doc.category ?? "");
    const sample = norm(doc.sampleMaterial ?? "");
    const blurb = norm(doc.blurb ?? "");

    let score = 0;
    let allMatched = true;
    const matched = new Set<string>();

    for (const tok of tokens) {
      let hit = 0;
      if (title === tok) hit = 16;
      else if (title.startsWith(tok)) hit = 12;
      else if (title.includes(tok)) hit = 8;

      bios.forEach((b, i) => {
        if (b === tok) {
          hit = Math.max(hit, 11);
          matched.add(doc.biomarkers[i]);
        } else if (b.includes(tok)) {
          hit = Math.max(hit, 7);
          matched.add(doc.biomarkers[i]);
        }
      });

      if (cat.includes(tok)) hit = Math.max(hit, 4);
      if (sample.includes(tok)) hit = Math.max(hit, 3);
      if (blurb.includes(tok)) hit = Math.max(hit, 1);

      if (hit === 0) allMatched = false;
      score += hit;
    }

    if (allMatched && score > 0) out.push({ doc, score, bios: [...matched] });
  }

  out.sort((a, b) => b.score - a.score || a.doc.title.length - b.doc.title.length);
  return out.slice(0, 24);
}

export function Search() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchDoc[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadIndex = useCallback(async () => {
    if (index || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/search-index");
      const json = (await res.json()) as { docs: SearchDoc[] };
      setIndex(json.docs ?? []);
    } catch {
      setIndex([]);
    } finally {
      setLoading(false);
    }
  }, [index, loading]);

  // ⌘K / Strg+K fokussiert das Feld, Esc schließt/blurt.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        void loadIndex();
        setOpen(true);
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loadIndex]);

  // Klick außerhalb schließt das Dropdown.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(
    () => (index ? rank(index, query) : []),
    [index, query],
  );

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="flex h-12 items-center gap-2.5 rounded-full border border-moss/20 bg-soft px-4 transition-shadow focus-within:border-moss focus-within:ring-4 focus-within:ring-moss/10">
        <SearchIcon className="h-5 w-5 shrink-0 text-moss" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            void loadIndex();
            setOpen(true);
          }}
          placeholder="Tests & Biomarker suchen – z. B. „Ferritin“"
          autoComplete="off"
          spellCheck={false}
          aria-label="Tests suchen"
          className="w-full bg-transparent text-h8 text-ink outline-none focus:outline-none focus-visible:outline-none placeholder:text-ink/45 [&::-webkit-search-cancel-button]:appearance-none"
        />
        <kbd className="hidden items-center rounded-md border border-ink/15 bg-soft-2 px-1.5 py-0.5 text-[0.7rem] font-medium text-ink/40 sm:inline-flex">
          ⌘K
        </kbd>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-[70vh] overflow-y-auto rounded-[var(--radius-brand)] border border-ink/10 bg-soft p-2 shadow-2xl">
          {query.trim().length === 0 ? (
            <div className="p-4">
              <p className="text-h8 text-ink/50">Beliebte Suchen</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQuery(s);
                      inputRef.current?.focus();
                    }}
                    className="rounded-full border border-moss/20 bg-soft px-3 py-1.5 text-h8 font-medium text-moss transition-colors hover:bg-moss hover:text-soft"
                  >
                    {s}
                  </button>
                ))}
              </div>
              {loading && <p className="mt-6 text-h8 text-ink/40">Lade Tests…</p>}
            </div>
          ) : results.length === 0 ? (
            <p className="p-6 text-center text-h8 text-ink/55">
              {loading
                ? "Lade Tests…"
                : `Keine Tests für „${query.trim()}“ gefunden.`}
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map(({ doc, bios }) => (
                <li key={doc.handle}>
                  <Link
                    href={`/tests/${doc.handle}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 rounded-2xl p-2.5 transition-colors hover:bg-lind/40"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-lind/40">
                      {doc.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={doc.image}
                          alt=""
                          width={56}
                          height={56}
                          className="h-full w-full object-contain p-1.5"
                        />
                      ) : (
                        <SearchIcon className="h-5 w-5 text-moss/40" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-h7 font-semibold text-ink">
                        {doc.title}
                      </span>
                      {bios.length > 0 ? (
                        <span className="mt-0.5 block truncate text-h8 text-moss">
                          Misst u. a.: {bios.slice(0, 4).join(", ")}
                        </span>
                      ) : (
                        doc.category && (
                          <span className="mt-0.5 block truncate text-h8 text-ink/50">
                            {doc.category}
                          </span>
                        )
                      )}
                    </span>
                    <span className="shrink-0 text-h7 font-bold text-moss">
                      {formatPrice(doc.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M14 14l4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
