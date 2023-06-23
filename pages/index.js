import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Flashcards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Flashcards!</h1>
        {user && (
          <p className={styles.description}>
            Check your decks to start learning
          </p>
        )}
        {!user && <p className={styles.description}>Log in to get started</p>}
      </div>
    </>
  );
}
