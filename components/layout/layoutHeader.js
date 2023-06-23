import Link from "next/link";
import Image from "next/image";
import styles from "./layout.module.css";

const LayoutHeader = ({
  user,
  signIn,
  signOut,
  theme,
  handleThemeChange,
  handleMenu,
}) => {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/decks">Decks</Link>
        <Link href="/learn">Learn</Link>
        {!user && (
          <Link href="/" onClick={signIn}>
            Login
          </Link>
        )}
        {user && (
          <Link href="/" onClick={signOut}>
            Logout
          </Link>
        )}
        <button onClick={handleThemeChange}>
          <Image
            priority
            src={
              theme === "light"
                ? "/lightbulb-regular.svg"
                : "/lightbulb-solid.svg"
            }
            height={18}
            width={18}
            alt="Theme Icon"
          />
        </button>
      </nav>
      <div>
        <button onClick={handleMenu}>
          <Image
            priority
            src="/bars-solid.svg"
            height={18}
            width={18}
            alt="Theme Icon"
          />
        </button>
      </div>
    </header>
  );
};

export default LayoutHeader;
