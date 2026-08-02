import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

export function FeaturedProducts() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Signature Collection"
            title="Our Signature Collection"
            description="Four compositions, each with a distinct character — chosen for the way they wear, not just the way they smell in a store."
          />
          <Button href="/shop" variant="secondary" withArrow className="hidden shrink-0 sm:inline-flex">
            View All
          </Button>
        </div>

        <ProductGrid products={products} className="mt-14" />

        <Button href="/shop" variant="secondary" withArrow className="mt-10 w-full justify-center sm:hidden">
          View All
        </Button>
      </Container>
    </section>
  );
}
