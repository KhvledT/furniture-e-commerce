import type { StaticImageData } from "next/image";

// Import all product images
import productDetails1 from "@/assets/imgs/productDetails/product1.png";
import productDetails2 from "@/assets/imgs/productDetails/product2.jpg";
import productDetails3 from "@/assets/imgs/productDetails/product3.jpg";
import productDetails4 from "@/assets/imgs/productDetails/product4.jpg";
import productDetails5 from "@/assets/imgs/productDetails/product5.jpg";
import productDetails6 from "@/assets/imgs/productDetails/product6.png";

import products1 from "@/assets/imgs/products/product1.png";

import cart1 from "@/assets/imgs/cart/cart1.png";
import cart2 from "@/assets/imgs/cart/cart2.png";

import specialPackage1 from "@/assets/imgs/landing/special/Special1.png";
import specialPackage2 from "@/assets/imgs/landing/special/Special2.png";
import specialPackage3 from "@/assets/imgs/landing/special/Special3.png";

import bestPick1 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage1.png";
import bestPick2 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage2.png";
import bestPick3 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage3.png";
import bestPick4 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage4.png";
import bestPick5 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage5.png";
import bestPick6 from "@/assets/imgs/landing/BestPicksImage/BestPicksImage6.png";

// Product data structure and utility functions

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: StaticImageData[];
  colors: ProductColor[];
  rating: number;
  reviewsCount: number;
  stock: number;
  inStock: boolean;
}

// Sample product data
export const products: Product[] = [
  {
    id: '1',
    name: 'Meryl Lounge Chair',
    category: 'Armchair',
    price: 149.99,
    originalPrice: 199.99,
    description:
      'The gently curved lines accentuated by sewn details are kind to your body and pleasant to look at. Also, there is a tilt and height-adjusting mechanism that is built to outlast years of ups and downs.',
    shortDescription: 'Comfortable lounge chair with adjustable features',
    images: [
      productDetails1,
      productDetails2,
      productDetails3,
      productDetails4,
      productDetails5,
      productDetails6,
    ],
    colors: [
      { name: 'Teal', hex: '#3182CE' },
      { name: 'Orange', hex: '#ED8936' },
      { name: 'Gray', hex: '#A0AEC0' },
      { name: 'Light Gray', hex: '#CBD5E0' },
      { name: 'Dark Gray', hex: '#4A5568' },
    ],
    rating: 4.6,
    reviewsCount: 556,
    stock: 12,
    inStock: true,
  },
  {
    id: '2',
    name: 'Modern Chair',
    category: 'Armchair',
    price: 125.00,
    originalPrice: 159.99,
    description: 'Sleek modern chair with ergonomic design',
    shortDescription: 'Contemporary armchair with clean lines',
    images: [products1],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#F5E6D3' },
    ],
    rating: 4.8,
    reviewsCount: 234,
    stock: 8,
    inStock: true,
  },
  {
    id: '3',
    name: 'Osmond Armchair',
    category: 'Armchair',
    price: 149.99,
    description: 'Classic design meets modern comfort',
    shortDescription: 'Elegant armchair for any room',
    images: [cart1],
    colors: [{ name: 'Gunnared Beige', hex: '#D9C5A0' }],
    rating: 4.5,
    reviewsCount: 123,
    stock: 5,
    inStock: true,
  },
  {
    id: '4',
    name: 'Larkin Wood Bed',
    category: 'Bed',
    price: 239.99,
    description: 'Solid wood bed frame with modern aesthetic',
    shortDescription: 'Spacious bed for comfortable sleep',
    images: [specialPackage1],
    colors: [{ name: 'Natural Wood', hex: '#8B6F47' }, { name: 'Dark Wood', hex: '#3D2F1E' }],
    rating: 4.7,
    reviewsCount: 89,
    stock: 10,
    inStock: true,
  },
  {
    id: '5',
    name: 'Skogsalm Nightstand',
    category: 'Nightstand',
    price: 199.99,
    description: 'Compact nightstand with drawer storage',
    shortDescription: 'Sleek nightstand for bedrooms',
    images: [specialPackage2],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Gray', hex: '#808080' }],
    rating: 4.3,
    reviewsCount: 67,
    stock: 15,
    inStock: true,
  },
  {
    id: '6',
    name: 'Rickarum Wooden Vase',
    category: 'Decoration',
    price: 89.99,
    description: 'Handcrafted wooden vase for floral arrangements',
    shortDescription: 'Decorative wooden vase',
    images: [specialPackage3],
    colors: [{ name: 'Natural', hex: '#D2B48C' }],
    rating: 4.9,
    reviewsCount: 45,
    stock: 20,
    inStock: true,
  },
  {
    id: '7',
    name: 'Classic Heater',
    category: 'Furniture',
    price: 59.99,
    description: 'A warm and cozy classic heater for your living room',
    shortDescription: 'Energy-efficient room heater',
    images: [bestPick1],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#000000' }],
    rating: 4.4,
    reviewsCount: 156,
    stock: 7,
    inStock: true,
  },
  {
    id: '8',
    name: 'Modern Lamp',
    category: 'Lamp',
    price: 45.00,
    description: 'A sleek and modern lamp with a minimalist design',
    shortDescription: 'Contemporary table lamp',
    images: [bestPick2],
    colors: [{ name: 'Black', hex: '#000000' }],
    rating: 4.6,
    reviewsCount: 98,
    stock: 12,
    inStock: true,
  },
  {
    id: '9',
    name: 'Rustic Lantern',
    category: 'Decoration',
    price: 35.00,
    description: 'Rustic lantern perfect for indoor and outdoor use',
    shortDescription: 'Vintage-style lantern',
    images: [bestPick3],
    colors: [{ name: 'Copper', hex: '#B87333' }],
    rating: 4.2,
    reviewsCount: 76,
    stock: 25,
    inStock: true,
  },
  {
    id: '10',
    name: 'Wooden Table',
    category: 'Tables',
    price: 89.00,
    description: 'A beautiful handmade wooden coffee table',
    shortDescription: 'Handcrafted wooden table',
    images: [bestPick4],
    colors: [{ name: 'Oak', hex: '#A0826D' }],
    rating: 4.8,
    reviewsCount: 143,
    stock: 6,
    inStock: true,
  },
  {
    id: '11',
    name: 'Oak Wardrobe',
    category: 'Wardrobe',
    price: 120.00,
    description: 'A sturdy wardrobe made from durable oak',
    shortDescription: 'Spacious oak wardrobe',
    images: [bestPick5],
    colors: [{ name: 'Natural Oak', hex: '#DEB887' }],
    rating: 4.7,
    reviewsCount: 112,
    stock: 4,
    inStock: true,
  },
  {
    id: '12',
    name: 'Small Nightstand',
    category: 'Nightstand',
    price: 49.00,
    description: 'Compact and stylish nightstand for modern rooms',
    shortDescription: 'Minimalist nightstand',
    images: [bestPick6],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Black', hex: '#000000' },
    ],
    rating: 4.5,
    reviewsCount: 87,
    stock: 18,
    inStock: true,
  },
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

// Helper function to get all products
export function getAllProducts(): Product[] {
  return products;
}

// Helper function to get related products
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  // Get products from the same category, excluding the current product
  const related = products.filter(
    (p) => p.category === product.category && p.id !== productId
  );
  
  // If not enough products in same category, add products from other categories
  if (related.length < limit) {
    const additional = products.filter(
      (p) => p.category !== product.category && p.id !== productId
    );
    related.push(...additional.slice(0, limit - related.length));
  }
  
  return related.slice(0, limit);
}