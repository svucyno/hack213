import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Sparkles, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Try-On', to: '/tryon' },
  { label: 'Dashboard', to: '/dashboard' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeLinkClass = 'text-pink-600 font-semibold'
  const inactiveLinkClass = 'text-gray-600 hover:text-pink-500 transition-colors duration-200'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <NavLink
            to="/"
            className="flex items-center gap-2 group select-none"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 shadow-sm group-hover:shadow-pink-300 transition-shadow duration-300">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-xl tracking-tight">
              FashionFit
            </span>
          </NavLink>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `text-sm tracking-wide ${isActive ? activeLinkClass : inactiveLinkClass}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA + Mobile Hamburger ── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/tryon')}
              className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium rounded-full px-5 py-2 hover:scale-105 hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Get Started
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-colors duration-200"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col gap-1 pb-4 pt-2">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-pink-600 font-semibold bg-pink-50'
                        : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50/60'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="px-4 pt-2">
              <button
                onClick={() => { navigate('/tryon'); setMenuOpen(false) }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium rounded-full px-5 py-2.5 hover:shadow-md hover:shadow-pink-200 transition-all duration-300 active:scale-95"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
