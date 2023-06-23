import IconButton from "../shared/iconButton";
import styles from "./learnButtons.module.css";

const LearnButtons = ({
  setIsLearn,
  setIsMatch,
  handleSelectAll,
  setSelectedDecks,
}) => {
  return (
    <div className={styles.optionsBtns}>
      <IconButton
        src="/graduation-cap-solid.svg"
        height={19}
        width={19}
        alt="Learn Icon"
        text="Learn selected"
        handleClick={() => setIsLearn(true)}
      />

      <IconButton
        src="/circle-play-solid.svg"
        height={18}
        width={18}
        alt="Play Match Icon"
        text="Match selected"
        handleClick={() => setIsMatch(true)}
      />

      <IconButton
        src="/circle-check-solid.svg"
        height={18}
        width={18}
        alt="Play Match Icon"
        text="Select all"
        handleClick={handleSelectAll}
      />

      <IconButton
        src="/circle-xmark-solid.svg"
        height={18}
        width={18}
        alt="Deselect Icon"
        text="Deselect all"
        handleClick={() => setSelectedDecks([])}
      />
    </div>
  );
};

export default LearnButtons;
