import { NavLink } from 'react-router'

function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-black font-semibold'
      : 'text-gray-500 hover:text-black'

  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b">
      <NavLink to="/" className="text-2xl font-bold tracking-widest">
        NOVA
      </NavLink>

      <div className="flex items-center gap-8">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/shop" className={linkClass}>Shop</NavLink>
        <NavLink to="/cart" className={linkClass}>Cart</NavLink>
        <NavLink to="/login" className={linkClass}>Account</NavLink>
      </div>
    </nav>
  )
}

export default Navbar