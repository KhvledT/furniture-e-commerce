"use client";

import ProductCard from '@/components/productCard';
import { getAllProducts } from '@/lib/products';
import PageTransition from '@/components/animations/PageTransition';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { staggerItem } from '@/components/animations/StaggerContainer';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <PageTransition>
      <div className="bg-[#2f2f2f] min-h-screen text-white p-8 md:p-16">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            All Products
          </h1>
        </ScrollReveal>

        {/* Responsive Grid */}
        <StaggerContainer>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <motion.div key={product.id} variants={staggerItem}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  imageUrl={product.images[0]}
                  rating={product.rating}
                />
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}