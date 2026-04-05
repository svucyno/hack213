export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-pink-100">
      <div className="rounded-full w-16 h-16 flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-xl text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-base">{description}</p>
    </div>
  )
}
