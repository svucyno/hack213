// FashionFit Backend
// FashionFit Backend
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// ─── Static file serving for uploads ─────────────────────────────────────────

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ─── Multer config ────────────────────────────────────────────────────────────

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  },
})

const upload = multer({ storage })

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'FashionFit API running', timestamp: new Date() })
})

// POST /api/tryon
app.post('/api/tryon', upload.single('image'), (req, res) => {
  const { outfitId } = req.body
  const file = req.file

  if (!file) {
    return res.status(400).json({ success: false, message: 'Image file is required.' })
  }

  if (!outfitId) {
    return res.status(400).json({ success: false, message: 'outfitId is required.' })
  }

  res.json({
    success: true,
    message: 'Try-on generated successfully',
    outfitId,
    imageUrl: `/uploads/${file.filename}`,
    recommendations: [
      {
        item: 'White Sneakers',
        type: 'Footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
      },
      {
        item: 'Gold Hoop Earrings',
        type: 'Jewellery',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200',
      },
      {
        item: 'Tan Leather Tote',
        type: 'Bag',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200',
      },
    ],
  })
})

// ─── Catch-all error middleware ───────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message })
})

// ─── Start server ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`FashionFit API running on http://localhost:${PORT}`)
})
