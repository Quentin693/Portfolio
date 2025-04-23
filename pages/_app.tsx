import type { AppProps } from 'next/app'
import '../styles/globals.css'  // Importez votre CSS global ici
import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Portfolio 3D Interactif</title>
        <meta name="description" content="Portfolio créatif et interactif en 3D avec Next.js, Three.js et Tailwind CSS" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp