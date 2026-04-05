const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
}

export default function LoadingSpinner({ size = 'md', label }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeMap[size]}`}>
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        {/* Inner white circle */}
        <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-white rounded-full" />
      </div>
      {label && (
        <p className="text-purple-600 font-medium mt-3 text-center">{label}</p>
      )}
    </div>
  )
}
