export const metadata = {
  title: 'NOOR',
  description: 'I have created a website for a relatives bag shop, using Next.js for the frontend, Node.js for the backend, and MongoDB as the database',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
