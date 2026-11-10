import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <div className="mb-4 text-2xl font-bold tracking-[0.3em] text-black">NOVA</div>
          <p className="max-w-sm text-sm leading-6 text-gray-600">
            Premium essentials for everyday movement, crafted with elevated materials and a
            minimalist point of view.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-black">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-black">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-black">
                Account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-black">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Gift Cards
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
            Follow
          </h3>
          <div className="flex gap-4 text-sm text-gray-600">
            <a href="#" className="hover:text-black">
              Instagram
            </a>
            <a href="#" className="hover:text-black">
              Pinterest
            </a>
            <a href="#" className="hover:text-black">
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 text-sm text-gray-500 sm:px-6 lg:px-8">
          <p>© 2026 NOVA. All rights reserved.</p>
          <p>Designed for modern living.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
