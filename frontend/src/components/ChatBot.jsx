import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Bot, Send } from 'lucide-react'

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Hi! I'm your AI fashion stylist 👗 Ask me anything about styling!",
    timestamp: new Date(),
  },
]

function getBotResponse(input) {
  const lower = input.toLowerCase()
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
    return "Hi there! 👋 How can I style you today?"
  if (lower.includes('outfit') || lower.includes('what to wear') || lower.includes('wear'))
    return "Tell me the occasion 😊 Is it casual, formal, party, or traditional?"
  if (lower.includes('casual'))
    return "For casual vibes, try a denim jacket with white tee and sneakers! 👟"
  if (lower.includes('formal'))
    return "A well-fitted blazer with trousers and Oxford shoes always wins! 👔"
  if (lower.includes('party'))
    return "Go bold! A sequin dress or sharp suit will turn heads 🎉"
  if (lower.includes('traditional'))
    return "A silk saree or sherwani would be perfect for traditional occasions 🌸"
  if (lower.includes('colour') || lower.includes('color'))
    return "This season, pastels and earth tones are trending. Try sage green or dusty rose! 🎨"
  if (lower.includes('trending') || lower.includes('trend'))
    return "High-waist trousers, oversized blazers, and co-ord sets are huge right now 🔥"
  if (lower.includes('help'))
    return "You can ask me about: outfits for occasions, colour advice, trending fashion, or styling tips!"
  return "Great question! Let me think... For a safe bet, always go monochrome with a statement accessory 💫"
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="bg-white text-gray-800 shadow-sm border border-pink-50 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[75%]">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChatBot() {
  const [isOpen, setIsOpen]         = useState(false)
  const [messages, setMessages]     = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping]     = useState(false)

  const messagesEndRef  = useRef(null)
  const inputRef        = useRef(null)

  // Auto-scroll to bottom whenever messages or typing indicator change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [isOpen])

  function handleSend() {
    const text = inputValue.trim()
    if (!text) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getBotResponse(text),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 800)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <>
      {/* ── Chat Window ──────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-pink-100 flex flex-col overflow-hidden max-h-96 z-50">

          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center">
              <Bot className="w-5 h-5 text-white" />
              <span className="text-white font-semibold ml-2 text-sm">FashionFit AI Stylist</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-75 transition-opacity duration-200"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[75%] text-sm'
                      : 'bg-white text-gray-800 shadow-sm border border-pink-50 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[75%] text-sm'
                  }
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400 mt-1 px-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-pink-100 p-3 flex gap-2 shrink-0 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about fashion..."
              className="flex-1 border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl px-3 py-2 hover:opacity-90 transition-opacity duration-200"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Toggle Button ────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300"
        aria-label="Toggle chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            1
          </span>
        )}
      </button>
    </>
  )
}
