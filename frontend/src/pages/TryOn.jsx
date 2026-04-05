import { useState, useRef, useEffect } from 'react'
import { Upload, Shirt } from 'lucide-react'
import axios from 'axios'
import outfits from '../data/outfits'
import OutfitCard from '../components/OutfitCard'
import LoadingSpinner from '../components/LoadingSpinner'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png']
const API_BASE = 'http://localhost:5000'

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function TryOn() {
  // ── Upload state ──────────────────────────────────────────────────────────
  const [dragActive, setDragActive]   = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl]   = useState(null)
  const [uploadError, setUploadError] = useState('')

  // ── Outfit state ──────────────────────────────────────────────────────────
  const [selectedOutfit, setSelectedOutfit] = useState(null)

  // ── Generation state ──────────────────────────────────────────────────────
  const [isLoading, setIsLoading]         = useState(false)
  const [result, setResult]               = useState(null)
  const [generateError, setGenerateError] = useState('')

  const fileInputRef = useRef(null)

  // ── Auto-dismiss error toast after 4 s ───────────────────────────────────
  useEffect(() => {
    if (!generateError) return
    const timer = setTimeout(() => setGenerateError(''), 4000)
    return () => clearTimeout(timer)
  }, [generateError])

  // ── File handling ─────────────────────────────────────────────────────────
  function applyFile(file) {
    if (!file) return
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadError('Only JPG and PNG files are supported.')
      return
    }
    setUploadError('')
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  function handleFileInput(e) {
    applyFile(e.target.files[0])
    e.target.value = ''
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragActive(false)
    applyFile(e.dataTransfer.files[0])
  }

  function handleDragOver(e) { e.preventDefault(); setDragActive(true) }
  function handleDragLeave(e) { e.preventDefault(); setDragActive(false) }

  function handleChangePhoto() {
    setSelectedFile(null)
    setPreviewUrl(null)
    setUploadError('')
    setResult(null)
    fileInputRef.current?.click()
  }

  // ── Generate ──────────────────────────────────────────────────────────────
  async function handleGenerate() {
    if (!selectedFile || !selectedOutfit) return

    setIsLoading(true)
    setResult(null)
    setGenerateError('')

    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('outfitId', selectedOutfit.id.toString())

    try {
      const [response] = await Promise.all([
        axios.post(`${API_BASE}/api/tryon`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ])
      setResult(response.data)
    } catch (err) {
      setGenerateError(
        err.response?.data?.message || err.message || 'Something went wrong.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const canGenerate = !!selectedFile && !!selectedOutfit

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

        {/* ══════════════════════════════════════════════════════════════════
            LEFT PANEL
        ══════════════════════════════════════════════════════════════════ */}
        <div className="w-full md:w-1/2">

          {/* ── Section A: Image Upload ─────────────────────────────────── */}
          <h2 className="font-bold text-2xl text-gray-800 mb-4">Upload Your Photo</h2>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileInput}
          />

          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                dragActive
                  ? 'border-pink-500 bg-pink-100'
                  : 'border-pink-300 bg-pink-50 hover:border-pink-400 hover:bg-pink-100'
              }`}
            >
              <Upload className="w-10 h-10 text-pink-400 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-1">Drag &amp; drop your photo here</p>
              <p className="text-gray-400 text-sm">or click to browse</p>
            </div>
          ) : (
            <div>
              <img
                src={previewUrl}
                alt="Your uploaded photo"
                className="rounded-2xl shadow-xl w-full max-h-64 object-cover"
              />
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-sm text-gray-700 font-medium truncate max-w-xs">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
                </div>
                <button
                  onClick={handleChangePhoto}
                  className="text-pink-500 underline text-sm hover:text-pink-700 transition-colors duration-200 shrink-0 ml-4"
                >
                  Change Photo
                </button>
              </div>
            </div>
          )}

          {uploadError && (
            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
          )}

          {/* ── Section B: Outfit Selection ─────────────────────────────── */}
          <h2 className="font-bold text-2xl text-gray-800 mb-4 mt-8">Choose Your Outfit</h2>

          <div className="grid grid-cols-2 gap-4">
            {outfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                isSelected={selectedOutfit?.id === outfit.id}
                onSelect={() =>
                  setSelectedOutfit(selectedOutfit?.id === outfit.id ? null : outfit)
                }
              />
            ))}
          </div>

          {/* ── Generate Button ──────────────────────────────────────────── */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isLoading}
            title={!canGenerate ? 'Please upload a photo and select an outfit' : undefined}
            className={`mt-8 w-full py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl transition-all duration-300 ${
              canGenerate && !isLoading
                ? 'hover:from-pink-600 hover:to-purple-700 hover:scale-105'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            ✨ Generate Try-On
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT PANEL
        ══════════════════════════════════════════════════════════════════ */}
        <div className="w-full md:w-1/2">

          {/* State 1 — Idle */}
          {!isLoading && !result && (
            <div className="border-2 border-dashed border-pink-200 rounded-2xl bg-white/60 p-16 text-center h-full flex flex-col items-center justify-center">
              <Shirt className="w-24 h-24 text-pink-200 mx-auto" />
              <p className="text-gray-400 font-medium mt-4">
                Your try-on result will appear here
              </p>
            </div>
          )}

          {/* State 2 — Loading */}
          {isLoading && (
            <div className="bg-white rounded-2xl shadow-xl p-16 text-center h-full flex flex-col items-center justify-center">
              <LoadingSpinner size="lg" />
              <p className="text-purple-600 font-semibold mt-4 animate-pulse">
                Generating your look... ✨
              </p>
            </div>
          )}

          {/* State 3 — Result */}
          {result && !isLoading && (
            <div className="bg-white rounded-2xl shadow-2xl p-6">

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-gray-800">✨ AI Try-On Result</h3>
                <span className="bg-green-100 text-green-600 text-sm font-semibold rounded-full px-3 py-1">
                  98% Style Match
                </span>
              </div>

              {/* Side-by-side images */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <img
                    src={previewUrl}
                    alt="You"
                    className="rounded-xl w-full object-cover h-64 shadow"
                  />
                  <p className="text-sm text-gray-500 text-center mt-1">You</p>
                </div>
                <div className="w-1/2">
                  <img
                    src={selectedOutfit?.image}
                    alt={selectedOutfit?.name}
                    className="rounded-xl w-full object-cover h-64 shadow"
                  />
                  <p className="text-sm text-gray-500 text-center mt-1 truncate">
                    {selectedOutfit?.name}
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-3">Style Recommendations</h4>
                <div className="flex gap-3">
                  {result.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="bg-pink-50 rounded-xl p-3 flex items-center gap-3 flex-1 min-w-0"
                    >
                      <img
                        src={rec.image}
                        alt={rec.item}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm text-gray-800 truncate">{rec.item}</p>
                        <p className="text-xs text-gray-400">{rec.type}</p>
                      </div>
                      <button className="text-pink-500 text-xs font-semibold ml-auto shrink-0 hover:text-pink-700 transition-colors duration-200">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ── Error Toast ───────────────────────────────────────────────────── */}
      {generateError && (
        <div className="fixed bottom-6 left-6 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 max-w-sm">
          {generateError}
        </div>
      )}
    </div>
  )
}
