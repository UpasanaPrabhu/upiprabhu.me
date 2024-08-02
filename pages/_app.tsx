import type { AppProps } from 'next/app'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../prismicio'

import Link from 'next/link'
import '../styles/fonts.scss';
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../components/Theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
      <PrismicPreview repositoryName={repositoryName}>
        <ChakraProvider theme={theme} resetScope='.chakra-scope'>
          <Component {...pageProps} />
        </ChakraProvider>
      </PrismicPreview>
    </PrismicProvider>
  )
}

export default MyApp