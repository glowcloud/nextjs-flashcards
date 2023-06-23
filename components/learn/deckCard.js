import styles from "./deckCard.module.css";
import utilStyles from "../../styles/utils.module.css";

const DeckCard = ({ deckId, selectedDecks, handleDeckChoice, title, tags }) => {
  return (
    <div
      key={deckId}
      className={`${utilStyles.card} ${styles.card} ${
        selectedDecks.includes(deckId) ? utilStyles.chosen : ""
      }`}
      onClick={() => handleDeckChoice(deckId)}
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
    </div>
  );
};

export default DeckCard;
