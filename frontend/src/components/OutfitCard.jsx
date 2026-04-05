import { Check } from 'lucide-react'

export default function OutfitCard({ outfit, isSelected, onSelect }) {
  const { name, category, price, image } = outfit

  return (
    <div
      onClick={onSelect}
      className={`rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${
        isSelected
          ? 'border-pink-400 ring-2 ring-pink-400'
          : 'border-transparent'
      }`}
    >
      {/* Image + checkmark overlay */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-3 bg-white">
        <p className="font-semibold text-gray-800 text-sm truncate mb-1.5">{name}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="bg-pink-100 text-pink-600 text-xs rounded-full px-2 py-1 font-medium">
            {category}
          </span>
          <span className="font-bold text-purple-600 text-sm">{price}</span>
        </div>
      </div>
    </div>
  )
}
