'use client'
import { useState } from "react"
import QRDisplay from "../components/QrDisplay"

export default function Home() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [qr, setQr] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setShortUrl("")
    setQr("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kisa-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uzun_url: url }),
      })

      if (!res.ok) {
        throw new Error("API hatası oluştu.")
      }

      const data = await res.json()
      setShortUrl(data.kisa_url)
      setQr(data.qr_base64)
    } catch (err) {
      setError("Kısaltma işlemi başarısız oldu. Lütfen tekrar deneyin.")
      console.error(err)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Kün Link Kısaltıcı</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="🔗 Uzun URL’yi buraya yapıştır..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            🔧 Kısalt
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {shortUrl && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg text-center shadow-inner">
            <p className="text-lg font-semibold text-gray-800 mb-2">🎯 Kısa Link:</p>
            <a
              href={shortUrl}
              className="text-blue-700 font-mono underline break-all hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>

            <div className="my-4">
              <QRDisplay base64={qr} />
            </div>

            <a
              href={`/stats/${shortUrl.split("/").pop()}`}
              className="text-sm text-gray-600 underline hover:text-gray-800"
            >
              📊 İstatistikleri Gör
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
