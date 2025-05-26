export default async function StatsPage({ params }) {
  const res = await fetch(`http://127.0.0.1:8000/istatistik/${params.code}`)
  if (!res.ok) return <p>Link bulunamadı.</p>
  const data = await res.json()

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">İstatistik</h1>
      <p><strong>Kısa Kod:</strong> {data.kisa_kod}</p>
      <p><strong>Uzun URL:</strong> {data.uzun_url}</p>
      <p><strong>Tıklama Sayısı:</strong> {data.tiklama_sayisi}</p>
      <a href="/" className="block mt-6 underline text-blue-600">← Ana sayfaya dön</a>
    </div>
  )
}
