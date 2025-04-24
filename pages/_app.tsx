import type { AppProps } from 'next/app'
import '../styles/globals.css'  // Importez votre CSS global ici
import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Portfolio Cialone Quentin</title>
        <meta name="description" content="Portfolio créatif et interactif Quentin Cialone" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp