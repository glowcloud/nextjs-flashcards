import styles from "./loadingBar.module.css";
import utilStyles from "../../styles/utils.module.css";

const LoadingBar = () => {
  return (
    <section className={styles.section}>
      <h1 className={utilStyles.title}>Loading...</h1>
      <div className={styles.loading} />
    </section>
  );
};

export default LoadingBar;
