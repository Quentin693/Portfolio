import type { AppProps } from 'next/app'
import '../styles/globals.css'  // Importez votre CSS global ici

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp