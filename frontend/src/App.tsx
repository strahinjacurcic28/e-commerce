import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'

import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Register from './pages/Register'
import Shop from './pages/Shop'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('nova-theme')
    return savedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('nova-theme', theme)
  }, [theme])

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))} />

      <main className="min-h-[calc(100vh-180px)] bg-[#f8f7f5] text-black transition-colors duration-200 dark:bg-[#090909] dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App