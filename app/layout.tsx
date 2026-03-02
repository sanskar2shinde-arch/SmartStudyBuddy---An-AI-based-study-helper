
import './globals.css'

export const metadata = {
  title: 'SmartStudyBuddy',
  description: 'Learn smarter. Grow faster.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
