import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import styles from "./cardFormInputs.module.css";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const editorOptions = {
  spellChecker: false,
  unorderedListStyle: "-",
  hideIcons: ["side-by-side", "fullscreen", "guide"],
  showIcons: ["table", "horizontal-rule"],
  status: false,
  maxHeight: "150px",
};

const CardFormInputs = ({
  cardFront,
  setCardFront,
  cardContent,
  setCardContent,
  isError,
}) => {
  return (
    <>
      <label htmlFor="front">Front:</label>
      <input
        type="text"
        id="front"
        name="front"
        value={cardFront}
        required
        onChange={(e) => setCardFront(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      />
      {isError && cardFront === "" && (
        <p className={styles.error}>Please fill in the front field.</p>
      )}
      {(!isError || (isError && cardFront !== "")) && <br />}

      <label htmlFor="back">Back:</label>
      <SimpleMdeReact
        id="back"
        name="back"
        value={cardContent}
        options={editorOptions}
        onChange={(value) => setCardContent(value)}
      />
      {isError && cardContent === "" && (
        <p className={styles.error}>Please fill in the back field.</p>
      )}
      {(!isError || (isError && cardContent !== "")) && <br />}
    </>
  );
};

export default CardFormInputs;
