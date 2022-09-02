import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';
const Layout = ({ children }) => (
  <>
    <Head>
      <title>Real Estate</title>
      <link rel="shortcut icon" href="realestatelogo.png" type="image/x-icon" />
    </Head>
    <Box maxWidth="1280px" m="auto">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </Box>
  </>
);

export default Layout;
