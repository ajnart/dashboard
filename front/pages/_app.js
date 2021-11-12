import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layouts/main'
// import { AnimatePresence } from 'framer-motion'
// import theme from '../libs/theme'

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider /*theme={theme}*/>
      <Layout router={router}>
          <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
