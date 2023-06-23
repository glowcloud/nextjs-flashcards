import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import LayoutHeader from "./layoutHeader";
import LayoutDrawer from "./layoutDrawer";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, handleSignIn, handleSignOut } = useAuth();
  const { theme, handleThemeChange } = useTheme();
  const router = useRouter();

  const signIn = async (e) => {
    e.preventDefault();
    handleMenu();
    await handleSignIn();
    router.replace(router.asPath);
  };

  const signOut = async (e) => {
    e.preventDefault();
    handleMenu();
    await handleSignOut();
    router.replace("/");
  };

  const handleMenu = () => {
    if (showMenu) {
      setShowMenu(false);
      document.body.style.overflow = "auto";
    } else {
      setShowMenu(true);
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn by using flashcards" />
        <meta name="og:title" content="Flashcards" />
      </Head>
      <LayoutHeader
        user={user}
        signIn={signIn}
        signOut={signOut}
        theme={theme}
        handleThemeChange={handleThemeChange}
        handleMenu={handleMenu}
      />

      <LayoutDrawer
        user={user}
        signIn={signIn}
        signOut={signOut}
        theme={theme}
        handleThemeChange={handleThemeChange}
        handleMenu={handleMenu}
        showMenu={showMenu}
      />
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
