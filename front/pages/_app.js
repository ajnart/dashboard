import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layouts/main'

import { CookiesProvider } from 'react-cookie';

// import { AnimatePresence } from 'framer-motion'
// import theme from '../libs/theme'

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider /*theme={theme}*/>
      <CookiesProvider>
      <Layout router={router}> 
          <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
    </ChakraProvider>
  )
}

export default MyApp
