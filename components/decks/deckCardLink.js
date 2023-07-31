import Link from "next/link";
import styles from "./deckCardLink.module.css";
import utilStyles from "../../styles/utils.module.css";

const DeckCardLink = ({ id, title, tags }) => {
  return (
    <Link
      href={`/decks/${id}`}
      className={`${utilStyles.card} ${styles.card}`}
    >
      <h3>{title}</h3>
      <br />
      {tags && tags.length > 0 && (
        <div className={utilStyles.tags}>
          {tags.map((tag) => (
            <small key={tag}>#{tag} </small>
          ))}
        </div>
      )}
    </Link>
  );
};

export default DeckCardLink;
