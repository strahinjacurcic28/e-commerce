import type { Category, Product } from '../types/product'

export const categories: Category[] = [
  'Outerwear',
  'Tops',
  'Bottoms',
  'Sneakers',
  'Accessories',
]

export const products: Product[] = [
  {
    id: 'nova-ash-coat',
    name: 'Ash Wool Blend Coat',
    category: 'Outerwear',
    description:
      'A refined wool-blend coat cut for transitional layering, designed with a soft drape and minimal structure for everyday polish.',
    price: 320,
    salePrice: 280,
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    ],
    colors: ['Stone', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 124,
    stock: 12,
    material: 'Wool blend',
    newArrival: true,
  },
  {
    id: 'nova-echo-tee',
    name: 'Echo Cotton Tee',
    category: 'Tops',
    description:
      'A staple essential with a relaxed fit, soft brushed cotton, and a clean neckline that layers effortlessly from day to night.',
    price: 78,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    ],
    colors: ['Cream', 'Black', 'Sand'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.7,
    reviews: 88,
    stock: 32,
    material: 'Organic cotton',
  },
  {
    id: 'nova-andra-trouser',
    name: 'Andra Wide Trouser',
    category: 'Bottoms',
    description:
      'A modern wide-leg trouser with a fluid drape, concealed waistband, and refined finish suited for elevated everyday styling.',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    ],
    colors: ['Charcoal', 'Ivory'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 210,
    stock: 18,
    material: 'Viscose twill',
    newArrival: true,
  },
  {
    id: 'nova-volt-sneaker',
    name: 'Volt Runner Sneaker',
    category: 'Sneakers',
    description:
      'Built for all-day movement with a lightweight sole, sculpted profile, and subtle streetwear edge for polished everyday wear.',
    price: 240,
    salePrice: 210,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
    ],
    colors: ['Off White', 'Black', 'Stone'],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    rating: 4.8,
    reviews: 176,
    stock: 14,
    material: 'Leather and mesh',
  },
  {
    id: 'nova-lune-sling',
    name: 'Lune Leather Sling',
    category: 'Accessories',
    description:
      'A compact everyday crossbody designed for streamlined essentials, featuring premium vegan leather and polished metal hardware.',
    price: 150,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
    ],
    colors: ['Tan', 'Black'],
    sizes: ['One Size'],
    rating: 4.6,
    reviews: 61,
    stock: 22,
    material: 'Vegan leather',
  },
  {
    id: 'nova-kite-hoodie',
    name: 'Kite Heavyweight Hoodie',
    category: 'Tops',
    description:
      'An oversized heavyweight hoodie with brushed fleece interior, elevated drape, and a minimalist cut for cold-weather layering.',
    price: 160,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    ],
    colors: ['Ash', 'Midnight'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 94,
    stock: 26,
    material: 'Fleece cotton',
  },
  {
    id: 'nova-boreal-shirt',
    name: 'Boreal Overshirt',
    category: 'Outerwear',
    description:
      'A softly structured overshirt with a clean collar and utility pockets, balancing relaxed tailoring and versatile layering.',
    price: 210,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    ],
    colors: ['Olive', 'Black', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 133,
    stock: 10,
    material: 'Cotton twill',
  },
  {
    id: 'nova-vanta-sneaker',
    name: 'Vanta Street Runner',
    category: 'Sneakers',
    description:
      'A sleek low-profile runner with technical cushioning and tonal detailing to keep every step quiet and refined.',
    price: 260,
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
    ],
    colors: ['Black', 'White'],
    sizes: ['37', '38', '39', '40', '41', '42'],
    rating: 4.9,
    reviews: 142,
    stock: 20,
    material: 'Mesh and suede',
  },
]
