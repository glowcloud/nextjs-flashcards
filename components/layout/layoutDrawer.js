import Link from "next/link";
import Image from "next/image";
import styles from "./layout.module.css";

const LayoutDrawer = ({
  user,
  signIn,
  signOut,
  theme,
  handleThemeChange,
  handleMenu,
  showMenu,
}) => {
  return (
    <div className={`${styles.drawer} ${showMenu ? styles.open : ""}`}>
      <nav>
        <Link href="/" onClick={handleMenu}>
          Home
        </Link>
        <Link href="/decks" onClick={handleMenu}>
          Decks
        </Link>
        <Link href="/learn" onClick={handleMenu}>
          Learn
        </Link>
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
    </div>
  );
};

export default LayoutDrawer;
