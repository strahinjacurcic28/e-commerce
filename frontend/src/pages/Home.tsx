import { Link } from 'react-router'

import ProductCard from '../components/products/ProductCard'
import { products } from '../data/products'

const categoryCards = [
  {
    title: 'Outerwear',
    description: 'Layered essentials for everyday polish.',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Sneakers',
    description: 'Lightweight silhouettes built for motion.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Accessories',
    description: 'Small details that complete the look.',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
  },
]

function Home() {
  return (
    <div className="bg-[#f8f7f5] text-black transition-colors duration-200 dark:bg-[#111111] dark:text-white">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-gray-500">
            New season / minimal essentials
          </p>
          <h1 className="max-w-xl text-5xl font-medium tracking-[-0.06em] text-black sm:text-6xl">
            Designed for the rhythm of everyday life.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Elevated staples in refined silhouettes, created for modern movement and a calm, considered wardrobe.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/shop">
              <button className="inline-flex items-center justify-center bg-black px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:bg-gray-800">
                Shop collection
              </button>
            </Link>
            <Link to="/login">
              <button className="inline-flex items-center justify-center border border-gray-300 bg-white px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-black transition hover:border-black">
                Account
              </button>
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-gray-200 pt-6">
            <div>
              <p className="text-2xl font-medium text-black">4.9/5</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-500">Customer rating</p>
            </div>
            <div>
              <p className="text-2xl font-medium text-black">48h</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-500">Dispatch</p>
            </div>
            <div>
              <p className="text-2xl font-medium text-black">30 day</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-500">Returns</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
            alt="Model wearing NOVA essentials"
            className="h-full min-h-[500px] w-full object-cover"
          />
          <div className="absolute bottom-5 left-5 right-5 border border-white/60 bg-black/30 p-5 backdrop-blur-sm">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/80">NOVA signature</p>
            <p className="mt-2 text-2xl font-medium text-white">Minimal layers, maximum impact.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white dark:border-gray-800 dark:bg-[#181818]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-center text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-300 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div>Free shipping over $150</div>
          <div>Premium fabrics</div>
          <div>Built to last</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-gray-500">
              Shop by category
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-black dark:text-white">Curated essentials</h2>
          </div>
          <Link to="/shop" className="text-xs font-medium uppercase tracking-[0.18em] text-black hover:text-gray-600">
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categoryCards.map((category) => (
            <div key={category.title} className="group overflow-hidden border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-sm dark:border-gray-800 dark:bg-[#181818]">
              <img src={category.image} alt={category.title} className="h-80 w-full object-cover transition duration-300 group-hover:scale-105" />
              <div className="space-y-3 p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500">Collection</p>
                <h3 className="text-2xl font-medium text-black dark:text-white">{category.title}</h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{category.description}</p>
                <Link to="/shop" className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-gray-500">
              Best sellers
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-black dark:text-white">Featured products</h2>
          </div>
          <Link to="/shop" className="text-xs font-medium uppercase tracking-[0.18em] text-black hover:text-gray-600">
            Shop more
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#f2f0ee] dark:border-gray-800 dark:bg-[#151515]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
            alt="Editorial NOVA lifestyle"
            className="h-full min-h-[420px] w-full object-cover"
          />

          <div className="flex flex-col justify-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-gray-500">The NOVA approach</p>
            <h2 className="max-w-lg text-4xl font-medium tracking-tight text-black dark:text-white">
              Wardrobe pieces that move with you.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Thoughtful silhouettes, premium textures, and timeless design choices come together to create ease in everyday dressing.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#1b1b1b]">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-300">Materials</p>
                <p className="mt-3 text-xl font-medium text-black dark:text-white">Elevated essentials</p>
              </div>
              <div className="border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#1b1b1b]">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-300">Fit</p>
                <p className="mt-3 text-xl font-medium text-black dark:text-white">Crafted to move</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
