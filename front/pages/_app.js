import { ChakraProvider, Box, Image, Center, Heading } from '@chakra-ui/react'
import Layout from '../components/layouts/main'
import { useState, useEffect } from "react"

import { CookiesProvider } from 'react-cookie';
import { ServiceContextProvider } from '../components/hooks/ServiceContext'

// import { AnimatePresence } from 'framer-motion'
// import theme from '../libs/theme'


function MyApp({ Component, pageProps, router }) {
  const Splash = ({ children }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      // whatever you need to do
      setLoading(false);
    }, [])
    return !loading ? children : <Center h="100vh">
      <Box boxSize = 'sm' >
        <Center><Heading as='h1' size='2xl'>Loading...</Heading></Center>
        <Image src='https://c.tenor.com/epNMHGvRyHcAAAAd/gigachad-chad.gif'/>
</Box >
    </Center>
  
  }
  return (
    <Splash>
    <ChakraProvider /*theme={theme}*/>
      <CookiesProvider>
        <ServiceContextProvider>
          <Layout router={router}>
            <Component {...pageProps} />
          </Layout>
        </ServiceContextProvider>
      </CookiesProvider>
    </ChakraProvider>
    </Splash>
  )
}

export default MyApp
