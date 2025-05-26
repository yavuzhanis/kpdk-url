export default function QRDisplay({ base64 }) {
  if (!base64) return null
  return (
    <div className="mt-4">
      <img
        src={`data:image/png;base64,${base64}`}
        alt="QR Code"
        className="mx-auto"
      />
    </div>
  )
}
