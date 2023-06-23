import IconButton from "../shared/iconButton";
import styles from "./editCard.module.css";

const EditCardMove = ({
  allDecks,
  deckData,
  moveChecked,
  setMoveChecked,
  handleMove,
}) => {
  return (
    <div className={styles.choices}>
      <fieldset>
        {allDecks
          .filter((deck) => deck.id !== deckData.deckId)
          .map((deck) => (
            <label key={deck.id} className={styles.checkbox}>
              <input
                id={`${deck.id}Move`}
                type="radio"
                name="move"
                checked={moveChecked === deck.id}
                onChange={() => setMoveChecked(deck.id)}
              />
              <label htmlFor={`${deck.id}Move`}>{deck.title}</label>
            </label>
          ))}
      </fieldset>
      <IconButton
        src="/circle-check-solid.svg"
        height={18}
        width={18}
        alt="Confirm Icon"
        text="Confirm move"
        handleClick={handleMove}
      />
      <hr />
    </div>
  );
};

export default EditCardMove;
