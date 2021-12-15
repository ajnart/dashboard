import Head from "next/head";
import { Box } from '@chakra-ui/react'
import Header from "../Header";

const Main = ({ children }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>The Dashboard</title>
      </Head>
      <Header/>
      <Box>
        {children}
      </Box>
    </Box>
  );
};

export default Main;

