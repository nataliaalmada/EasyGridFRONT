import { ChakraProvider } from "@chakra-ui/react";
// Remover importações de autenticação para teste direto
import { UserProvider } from "../contexts/UserContext";
import { PageInstProvider } from "../contexts/PageInstContext";
import { NoticiasProvider } from "../contexts/NoticiasContext";

import { useRouter } from "next/router";
import "@fontsource/noto-sans/400.css";
import "@fontsource/roboto-condensed/700.css";
import theme from "../styles/theme";
import "../styles/style-rug.css";

import Layout from "../components/layout";
import LayoutAdmin from "../components/layoutadmin";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname.startsWith("/admin")) {
    return (
      <UserProvider>
        <PageInstProvider>
          <NoticiasProvider>
            <ChakraProvider theme={theme}>
              <LayoutAdmin>
                <Component {...pageProps} />
              </LayoutAdmin>
            </ChakraProvider>
          </NoticiasProvider>
        </PageInstProvider>
      </UserProvider>
    );
  }

  return (
    <UserProvider>
      <PageInstProvider>
        <NoticiasProvider>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </NoticiasProvider>
      </PageInstProvider>
    </UserProvider>
  );
}

