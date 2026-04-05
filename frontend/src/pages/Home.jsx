import { useNavigate } from 'react-router-dom'
import { Camera, Shirt, Sparkles } from 'lucide-react'
import FeatureCard from '../components/FeatureCard'

const steps = [
  {
    number: '1',
    label: 'Upload',
    desc: 'Upload a clear photo of yourself in a neutral pose.',
  },
  {
    number: '2',
    label: 'Select',
    desc: 'Browse our curated collection and pick your favourite outfit.',
  },
  {
    number: '3',
    label: 'Generate',
    desc: 'Our AI renders your virtual try-on in seconds.',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="pt-16">

      {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-6 leading-tight">
          Try Before You Buy 👗
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          AI-powered virtual try-on for smarter fashion choices. Upload your photo, pick an outfit, and see the magic.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate('/tryon')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full px-8 py-4 font-semibold hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Start Try-On
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="border-2 border-purple-300 text-purple-600 rounded-full px-8 py-4 font-semibold hover:scale-105 transition-all duration-300"
          >
            View Dashboard
          </button>
        </div>
      </section>

      {/* ── Section 2: Feature Cards ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How FashionFit Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
          <FeatureCard
            icon={<Camera className="w-7 h-7 text-pink-500" />}
            title="Upload Your Photo"
            description="Drag & drop or click to upload. We support JPG, PNG formats."
          />
          <FeatureCard
            icon={<Shirt className="w-7 h-7 text-purple-500" />}
            title="Pick Your Outfit"
            description="Browse curated outfits and select the one you love."
          />
          <FeatureCard
            icon={<Sparkles className="w-7 h-7 text-indigo-500" />}
            title="See the Magic"
            description="AI generates your virtual try-on in seconds."
          />
        </div>
      </section>

      {/* ── Section 3: 3-Step Process ─────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Simple 3-Step Process
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto px-6">
          {steps.map(({ number, label, desc }) => (
            <div key={number} className="relative text-center w-64">
              <span className="text-8xl font-bold text-pink-100 absolute -top-6 left-1/2 -translate-x-1/2 select-none leading-none">
                {number}
              </span>
              <div className="relative z-10 pt-8">
                <p className="text-lg font-semibold text-gray-800">
                  {number}. {label}
                </p>
                <p className="text-gray-500 text-sm mt-2">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-1">
          FashionFit
        </p>
        <p className="text-gray-400 mb-6">Try Before You Buy 👗</p>
        <p className="text-gray-500 text-sm mb-1">Built with ❤️ for Fashion &amp; AI</p>
        <p className="text-gray-600 text-sm">© 2024 FashionFit. All rights reserved.</p>
      </footer>

    </div>
  )
}
