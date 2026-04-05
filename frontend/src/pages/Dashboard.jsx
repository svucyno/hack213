import { useNavigate } from 'react-router-dom'
import { TrendingUp, Heart, Star, Shirt } from 'lucide-react'
import outfits from '../data/outfits'

const stats = [
  { icon: <TrendingUp className="w-6 h-6 text-pink-500" />,   number: '12',  label: 'Total Try-Ons' },
  { icon: <Heart       className="w-6 h-6 text-red-400" />,    number: '4',   label: 'Favourite Outfits' },
  { icon: <Star        className="w-6 h-6 text-yellow-400" />, number: '94%', label: 'Style Score' },
  { icon: <Shirt       className="w-6 h-6 text-purple-500" />, number: '6',   label: 'Outfits Explored' },
]

const recentActivity = [
  { name: 'Floral Summer Dress', date: '2 days ago',  category: 'Casual',      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop' },
  { name: 'Business Formal Suit', date: '5 days ago', category: 'Formal',      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e85?w=300&h=400&fit=crop' },
  { name: 'Ethnic Kurti Set',     date: '1 week ago', category: 'Traditional', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const recommended = outfits.slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <h1 className="text-4xl font-bold text-gray-800">Your Style Dashboard</h1>
        <p className="text-gray-500 mt-2">Track your fashion journey</p>

        {/* ── Stats Row ────────────────────────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon, number, label }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center mb-3">
                {icon}
              </div>
              <span className="text-3xl font-bold text-gray-800">{number}</span>
              <span className="text-gray-500 text-sm mt-1">{label}</span>
            </div>
          ))}
        </div>

        {/* ── Recent Activity ───────────────────────────────────────────────── */}
        <div className="mt-12">
          <h2 className="font-bold text-2xl text-gray-800 mb-6">Recent Try-Ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentActivity.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  <span className="bg-pink-100 text-pink-600 text-xs rounded-full px-2 py-1 mt-2 inline-block">
                    {item.category}
                  </span>
                  <button
                    onClick={() => navigate('/tryon')}
                    className="mt-3 w-full border border-pink-300 text-pink-600 rounded-xl py-2 text-sm hover:bg-pink-50 transition-colors duration-200"
                  >
                    View Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Style Recommendations ─────────────────────────────────────────── */}
        <div className="mt-12">
          <h2 className="font-bold text-2xl text-gray-800 mb-6">Recommended For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommended.map((outfit) => (
              <div
                key={outfit.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 relative"
              >
                <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full px-2 py-1 z-10">
                  For You
                </span>
                <img
                  src={outfit.image}
                  alt={outfit.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-800 truncate">{outfit.name}</p>
                  <p className="text-purple-600 font-bold text-sm mt-0.5">{outfit.price}</p>
                  <button
                    onClick={() => navigate('/tryon')}
                    className="mt-2 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl py-2 text-sm hover:scale-105 transition-all duration-300"
                  >
                    Try Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
