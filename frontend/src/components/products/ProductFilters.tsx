import Input from '../common/Input'
import Button from '../common/Button'

interface ProductFiltersProps {
  categories: string[]
  sizes: string[]
  selectedCategory: string
  selectedSizes: string[]
  maxPrice: number
  searchTerm: string
  onCategoryChange: (value: string) => void
  onSizeChange: (value: string) => void
  onPriceChange: (value: number) => void
  onSearchChange: (value: string) => void
  onClearFilters: () => void
}

function ProductFilters({
  categories,
  sizes,
  selectedCategory,
  selectedSizes,
  maxPrice,
  searchTerm,
  onCategoryChange,
  onSizeChange,
  onPriceChange,
  onSearchChange,
  onClearFilters,
}: ProductFiltersProps) {
  return (
    <aside className="space-y-6 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#181818]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-medium uppercase tracking-[0.18em] text-black dark:text-white">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-xs uppercase tracking-[0.12em]">
          Reset
        </Button>
      </div>

      <div>
        <Input
          label="Search"
          value={searchTerm}
          placeholder="Search products"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={[
                'border px-3 py-2 text-xs uppercase tracking-[0.12em] transition',
                selectedCategory === category
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-black dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-gray-200 dark:hover:border-white',
              ].join(' ')}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Size</label>
          {selectedSizes.length > 0 ? (
            <button
              type="button"
              onClick={() => onSizeChange('all')}
              className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Clear
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeChange(size)}
              className={[
                'min-w-12 border px-3 py-2 text-xs uppercase tracking-[0.12em] transition',
                selectedSizes.includes(size)
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-black dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-gray-200 dark:hover:border-white',
              ].join(' ')}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
          <span>Max price</span>
          <span>${maxPrice}</span>
        </div>
        <input
          type="range"
          min="50"
          max="320"
          step="10"
          value={maxPrice}
          onChange={(event) => onPriceChange(Number(event.target.value))}
          className="w-full accent-black"
        />
      </div>
    </aside>
  )
}

export default ProductFilters
