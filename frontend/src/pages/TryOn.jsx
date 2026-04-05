import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import outfits from '../data/outfits'
import OutfitCard from '../components/OutfitCard'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png']

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function TryOn() {
  // ── Upload state ──────────────────────────────────────────────────────────
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [uploadError, setUploadError] = useState('')

  // ── Outfit state ──────────────────────────────────────────────────────────
  const [selectedOutfit, setSelectedOutfit] = useState(null)

  const fileInputRef = useRef(null)

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
    // reset so same file can be re-selected
    e.target.value = ''
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragActive(false)
    applyFile(e.dataTransfer.files[0])
  }

  function handleDragOver(e) {
    e.preventDefault()
    setDragActive(true)
  }

  function handleDragLeave(e) {
    e.preventDefault()
    setDragActive(false)
  }

  function handleChangePhoto() {
    setSelectedFile(null)
    setPreviewUrl(null)
    setUploadError('')
    fileInputRef.current?.click()
  }

  // ── Generate (stub) ───────────────────────────────────────────────────────
  function handleGenerate() {
    console.log('Generating try-on:', { file: selectedFile, outfit: selectedOutfit })
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

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileInput}
          />

          {!selectedFile ? (
            /* Drag & drop zone */
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
            /* Preview */
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

          {/* Upload error */}
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
            disabled={!canGenerate}
            title={!canGenerate ? 'Please upload a photo and select an outfit' : undefined}
            className={`mt-8 w-full py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl transition-all duration-300 ${
              canGenerate
                ? 'hover:from-pink-600 hover:to-purple-700 hover:scale-105'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            ✨ Generate Try-On
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT PANEL — placeholder
        ══════════════════════════════════════════════════════════════════ */}
        <div className="w-full md:w-1/2 flex items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-white/60 min-h-64 text-gray-400 text-sm font-medium">
          Output Panel — Coming in next PR
        </div>

      </div>
    </div>
  )
}
