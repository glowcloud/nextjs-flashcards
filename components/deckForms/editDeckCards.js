import IconButton from "../shared/iconButton";
import styles from "./editDeckCards.module.css";
import utilStyles from "../../styles/utils.module.css";

const EditDeckCards = ({
  cards,
  selectedCards,
  handleCardChoice,
  handleDeleteSelected,
}) => {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <div
          key={card.originalId}
          className={`${utilStyles.card} ${
            selectedCards.includes(card.originalId) ? utilStyles.chosen : ""
          }`}
          onClick={() => handleCardChoice(card.originalId)}
        >
          <h2>{card.front}</h2>
        </div>
      ))}
      <IconButton
        src="/trash-solid.svg"
        height={16}
        width={16}
        alt="Delete Icon"
        text="Delete selected cards"
        handleClick={handleDeleteSelected}
      />
      <hr />
    </div>
  );
};

export default EditDeckCards;
