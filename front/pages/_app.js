import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layouts/main'

import { CookiesProvider } from 'react-cookie';
import { ServiceContextProvider } from '../components/hooks/ServiceContext'

// import { AnimatePresence } from 'framer-motion'
// import theme from '../libs/theme'

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider /*theme={theme}*/>
      <CookiesProvider>
        <ServiceContextProvider>
          <Layout router={router}>
            <Component {...pageProps} />
          </Layout>
        </ServiceContextProvider>
      </CookiesProvider>
    </ChakraProvider>
  )
}

export default MyApp
