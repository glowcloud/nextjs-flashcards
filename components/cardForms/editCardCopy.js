import IconButton from "../shared/iconButton";
import styles from "./editCard.module.css";

const EditCardCopy = ({
  allDecks,
  deckData,
  copyChecked,
  handleCopyCheck,
  handleCopy,
}) => {
  return (
    <div className={styles.choices}>
      <fieldset>
        {allDecks
          .filter((deck) => deck.id !== deckData.deckId)
          .map((deck) => (
            <label key={deck.id} className={styles.checkbox}>
              <input
                id={`${deck.id}Copy`}
                type="checkbox"
                checked={copyChecked.includes(deck.id)}
                onChange={() => handleCopyCheck(deck.id)}
              />
              <label htmlFor={`${deck.id}Copy`}>{deck.title}</label>
            </label>
          ))}
      </fieldset>
      <IconButton
        src="/circle-check-solid.svg"
        height={18}
        width={18}
        alt="Confirm Icon"
        text="Confirm copy"
        handleClick={handleCopy}
      />
      <hr />
    </div>
  );
};

export default EditCardCopy;
