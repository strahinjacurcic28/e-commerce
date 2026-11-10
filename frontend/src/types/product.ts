export type Category =
  | 'Outerwear'
  | 'Tops'
  | 'Bottoms'
  | 'Sneakers'
  | 'Accessories'

export interface ProductVariant {
  size: string
  color: string
  stock: number
}

export interface Product {
  id: string
  name: string
  category: Category
  description: string
  price: number
  salePrice?: number
  image: string
  gallery: string[]
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
  stock: number
  material?: string
  newArrival?: boolean
}

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  size: string
  color: string
  quantity: number
}
