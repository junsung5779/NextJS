import Link from 'next/link'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            홈
          </Link>
          <Link href="/list">todo-list</Link>
          <Link href="/write">todo-write</Link>
        </div>
        {children}
      </body>
    </html>
  )
}
