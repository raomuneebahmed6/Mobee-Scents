"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const CATEGORIES = Array.from(new Set(products.map((p) => p.category)));

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

export function ShopClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<string | null>(searchParams.get("category"));
  const [note, setNote] = useState<string | null>(searchParams.get("note"));
  const [sort, setSort] = useState<SortKey>((searchParams.get("sort") as SortKey) ?? "featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.noteFamilies.some((n) => n.toLowerCase().includes(q))
      );
    }
    if (category) list = list.filter((p) => p.category === category);
    if (note) list = list.filter((p) => p.noteFamilies.includes(note));

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }

    return list;
  }, [query, category, note, sort]);

  const activeFilters = [category, note].filter(Boolean).length + (query.trim() ? 1 : 0);

  return (
    <div className="bg-ivory pt-32 pb-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">The Full Collection</p>
          <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Shop All Fragrances</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-charcoal/60">
            Search, filter, and sort our collection to find the composition that fits you.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-y border-charcoal/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 sm:w-80">
            <Search size={17} strokeWidth={1.5} className="text-charcoal/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fragrances…"
              className="w-full bg-transparent text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center gap-2 text-sm text-charcoal/70 hover:text-charcoal lg:hidden"
            >
              <SlidersHorizontal size={15} strokeWidth={1.5} /> Filters {activeFilters > 0 && `(${activeFilters})`}
            </button>

            <label className="flex items-center gap-2 text-sm text-charcoal/70">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-charcoal/20 bg-ivory px-2 py-1.5 text-sm text-charcoal focus:border-gold focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div
          className={cn(
            "mt-5 flex-wrap items-center gap-2 lg:flex",
            filtersOpen ? "flex" : "hidden"
          )}
        >
          <span className="mr-1 text-xs tracking-[0.15em] text-charcoal/40 uppercase">Category:</span>
          <FilterChip active={!category} onClick={() => setCategory(null)}>
            All
          </FilterChip>
          {CATEGORIES.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(category === c ? null : c)}>
              {c}
            </FilterChip>
          ))}
          {note && (
            <FilterChip active onClick={() => setNote(null)}>
              Note: {note} <X size={12} className="ml-1 inline" />
            </FilterChip>
          )}
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} className="mt-12" />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 flex flex-col items-center gap-3 text-center"
          >
            <p className="font-serif text-2xl text-charcoal">No fragrances match your search</p>
            <p className="text-sm text-charcoal/55">Try a different search term or clear your filters.</p>
            <button
              onClick={() => {
                setQuery("");
                setCategory(null);
                setNote(null);
              }}
              className="mt-2 border-b border-gold pb-0.5 text-sm text-gold"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </Container>
    </div>
  );
}

function FilterChip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border px-3.5 py-1.5 text-xs tracking-[0.05em] uppercase transition-colors",
        active ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/20 text-charcoal/65 hover:border-charcoal"
      )}
    >
      {children}
    </button>
  );
}
