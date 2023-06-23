import { AuthContextProvider } from "../context/AuthContext";
import { ThemeContextProvider } from "../context/ThemeContext";
import Layout from "../components/layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}
