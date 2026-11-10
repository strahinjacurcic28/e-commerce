import { Link } from 'react-router'

import type { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-sm dark:border-gray-800 dark:bg-[#181818]">
      <div className="relative overflow-hidden">
        {product.newArrival ? (
          <span className="absolute left-4 top-4 z-10 bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-800">
            New
          </span>
        ) : null}

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-80 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500 dark:text-gray-300">
            {product.category}
          </span>
          {product.salePrice ? (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-700 dark:bg-[#272727] dark:text-gray-200">
              Sale
            </span>
          ) : null}
        </div>

        <div>
          <h3 className="text-lg font-medium text-black dark:text-white">{product.name}</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-black dark:text-white">${product.salePrice ?? product.price}</span>
          {product.salePrice ? (
            <span className="text-sm text-gray-400 line-through">${product.price}</span>
          ) : null}
        </div>

        <Link
          to={`/product/${product.id}`}
          className="inline-flex items-center text-sm font-medium tracking-[0.12em] text-black uppercase transition hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
        >
          View product
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
