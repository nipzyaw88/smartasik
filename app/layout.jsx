import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Footer from './components/Footer'
import { Providers } from './components/Provider'
// import HeaderMenu from './components/header_menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SmartAsik',
  description: 'Sistem Informasi Klinik',
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className='d-flex flex-column vh-100'>
            {children}
        </body>
      </html>
    </Providers>
  )
}