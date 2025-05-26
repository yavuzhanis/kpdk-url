import "../app/globals.css"

export const metadata = {
  title: "Kapadokya Url Kısaltıcı",
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
