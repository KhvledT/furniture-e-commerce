import { Product } from "./products";

/**
 * Generate JSON-LD structured data for a product
 * @param product - Product object
 * @returns JSON-LD structured data string
 */
export function generateProductStructuredData(product: Product): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Cozy",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cozy-furniture.com'}/products/${product.id}`,
      priceCurrency: "USD",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: "5",
      worstRating: "1",
    },
    image: product.images.map((img) => 
      img.src || (typeof img === 'string' ? img : '')
    ).filter(Boolean),
  };

  return JSON.stringify(structuredData);
}

/**
 * Generate JSON-LD structured data for the organization/website
 * @returns JSON-LD structured data string
 */
export function generateWebsiteStructuredData(): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cozy",
    description: "Crafting spaces that speak your style",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://cozy-furniture.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://cozy-furniture.com"}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return JSON.stringify(structuredData);
}

