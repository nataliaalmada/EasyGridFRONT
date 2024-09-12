import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../contexts/AuthContext";
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
      <AuthProvider>
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
      </AuthProvider>
    );
  }
  if (router.pathname.startsWith("/auth")) {
    return (
      <AuthProvider>
        <UserProvider>
          <PageInstProvider>
            <NoticiasProvider>
              <ChakraProvider theme={theme}>
                <Component {...pageProps} />
              </ChakraProvider>
            </NoticiasProvider>
          </PageInstProvider>
        </UserProvider>
      </AuthProvider>
    );
  }
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
