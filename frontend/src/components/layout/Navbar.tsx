import { NavLink } from 'react-router'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-black font-semibold dark:text-white'
      : 'text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white'

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-10 py-5 transition-colors duration-200 dark:border-[#2a2a2a] dark:bg-[#111111]">
      <NavLink to="/" className="text-2xl font-bold tracking-widest text-black dark:text-white">
        NOVA
      </NavLink>

      <div className="flex items-center gap-8">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/shop" className={linkClass}>Shop</NavLink>
        <NavLink to="/cart" className={linkClass}>Cart</NavLink>
        <NavLink to="/login" className={linkClass}>Account</NavLink>

        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-sm text-black shadow-sm transition hover:border-black dark:border-[#3a3a3a] dark:bg-[#1a1a1a] dark:text-white dark:hover:border-white dark:hover:bg-[#222222]"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '☾' : '☀'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar