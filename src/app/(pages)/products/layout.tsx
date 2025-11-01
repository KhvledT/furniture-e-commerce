import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products | Cozy Furniture',
  description: 'Browse our complete collection of high-quality furniture pieces to craft spaces that speak your style.',
  openGraph: {
    title: 'All Products | Cozy Furniture',
    description: 'Browse our complete collection of high-quality furniture pieces.',
    type: 'website',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

