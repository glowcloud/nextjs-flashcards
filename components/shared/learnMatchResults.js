import IconButton from "../shared/iconButton";
import styles from "./learnMatchResults.module.css";
import utilStyles from "../../styles/utils.module.css";

const LearnMatchResults = ({
  correctAnswers,
  incorrectAnswers,
  handleClose,
  isMatch,
}) => {
  return (
    <div className={utilStyles.content}>
      {correctAnswers >= 0 && incorrectAnswers >= 0 && (
        <h1 className={styles.info}>
          Your score: {correctAnswers} out of{" "}
          {correctAnswers + incorrectAnswers}
        </h1>
      )}
      {!correctAnswers && !incorrectAnswers && (
        <h1 className={styles.info}>
          No cards to {isMatch ? "match" : "learn"}
        </h1>
      )}
      <IconButton
        src="/xmark-solid.svg"
        height={18}
        width={18}
        alt="Incorrect Icon"
        text="Close"
        handleClick={handleClose}
      />
    </div>
  );
};

export default LearnMatchResults;
