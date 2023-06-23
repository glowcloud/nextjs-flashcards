import IconButton from "../shared/iconButton";
import styles from "./deckDropdown.module.css";

const DeckDropdown = ({
  setIsAddCard,
  setIsLearn,
  setIsMatch,
  setIsEditDeck,
  setIsConfirm,
}) => {
  return (
    <div className={styles.dropdown}>
      <IconButton
        src="/plus-solid.svg"
        height={18}
        width={18}
        alt="New Card Icon"
        text="New card"
        handleClick={() => setIsAddCard(true)}
      />

      <IconButton
        src="/graduation-cap-solid.svg"
        height={19}
        width={19}
        alt="Learn Icon"
        text="Learn cards"
        handleClick={() => setIsLearn(true)}
      />

      <IconButton
        src="/circle-play-solid.svg"
        height={18}
        width={18}
        alt="Play Match Icon"
        text="Match cards"
        handleClick={() => setIsMatch(true)}
      />

      <IconButton
        src="/pen-to-square-solid.svg"
        height={18}
        width={18}
        alt="Edit Icon"
        text="Edit deck"
        handleClick={() => setIsEditDeck(true)}
      />

      <IconButton
        src="/trash-solid.svg"
        height={16}
        width={16}
        alt="Delete Icon"
        text="Delete deck"
        handleClick={() => setIsConfirm(true)}
      />
    </div>
  );
};

export default DeckDropdown;
