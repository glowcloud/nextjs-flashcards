import IconButton from "../shared/iconButton";
import styles from "./deckFormInputs.module.css";
import utilStyles from "../../styles/utils.module.css";

const DeckFormInputs = ({
  title,
  setTitle,
  newTag,
  setNewTag,
  handleAddTag,
  handleRemoveTag,
  tags,
  isError,
}) => {
  return (
    <>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      />
      {isError && title === "" && (
        <p className={styles.error}>Please fill in the title field.</p>
      )}
      {(!isError || (isError && title !== "")) && <br />}

      <label htmlFor="tags">Tags:</label>
      <div className={styles.tagSection}>
        <input
          type="text"
          id="tags"
          name="tags"
          className={styles.front}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <IconButton
          src="/plus-solid.svg"
          height={18}
          width={18}
          alt="Add Icon"
          text="Add tag"
          handleClick={handleAddTag}
        />
        {tags.length > 0 && (
          <div className={`${utilStyles.tags} ${styles.tags}`}>
            {tags.map((tag, index) => {
              return (
                <p key={index} onClick={() => handleRemoveTag(index)}>
                  #{tag}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default DeckFormInputs;
