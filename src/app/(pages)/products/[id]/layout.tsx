import { Metadata } from "next";
import { getProductById } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Cozy",
      description: "The product you're looking for doesn't exist.",
    };
  }

  const imageUrl = product.images[0]?.src || product.images[0]?.toString() || "";

  return {
    title: `${product.name} | Cozy Furniture`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [imageUrl],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

