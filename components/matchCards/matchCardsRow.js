import styles from "./matchCards.module.css";
import utilStyles from "../../styles/utils.module.css";

const MatchCardsRow = ({
  index,
  cardFront,
  cardBack,
  missedFrontCards,
  guessedFrontCards,
  frontChoice,
  handleFrontClick,
  missedBackCards,
  guessedBackCards,
  backChoice,
  handleBackClick,
}) => {
  return (
    <div key={index} className={styles.row}>
      <div
        className={`${utilStyles.card} ${styles.card} ${
          missedFrontCards.includes(index) && frontChoice !== index
            ? styles.missed
            : guessedFrontCards.includes(index)
            ? styles.guessed
            : frontChoice === index
            ? utilStyles.chosen
            : ""
        }`}
        onClick={() => {
          if (!guessedFrontCards.includes(index)) {
            handleFrontClick(index);
          }
        }}
      >
        <h3>{cardFront}</h3>
      </div>
      <div
        className={`${utilStyles.card} ${styles.card} ${
          missedBackCards.includes(index) && backChoice !== index
            ? styles.missed
            : guessedBackCards.includes(index)
            ? styles.guessed
            : backChoice === index
            ? utilStyles.chosen
            : ""
        }`}
        dangerouslySetInnerHTML={{
          __html: cardBack.contentHtml[0],
        }}
        onClick={() => {
          if (!guessedBackCards.includes(index)) {
            handleBackClick(index);
          }
        }}
      ></div>
    </div>
  );
};

export default MatchCardsRow;
