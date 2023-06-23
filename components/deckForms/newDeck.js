import { useState } from "react";
import { useRouter } from "next/router";
import { addDeck } from "../../lib/decks";
import { useAuth } from "../../context/AuthContext";
import DeckFormInputs from "./deckFormInputs";
import IconButton from "../shared/iconButton";
import utilStyles from "../../styles/utils.module.css";

const NewDeck = ({ handleModal }) => {
  const [title, setTitle] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user && title !== "") {
      const newDeck = {
        userId: user.uid,
        title,
        tags,
        cards: [],
      };

      const deckId = await addDeck(newDeck);

      handleModal();

      if (deckId) {
        router.push(`/decks/${deckId}`);
      }
    } else [setIsError(true)];
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prevTags) => [...prevTags, newTag]);
    }
    setNewTag("");
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((tag, id) => id !== index));
  };

  return (
    <div className={utilStyles.modal}>
      <span
        onClick={handleModal}
        className={utilStyles.close}
        title="Close Modal"
      >
        &times;
      </span>

      <form
        className={utilStyles.content}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <DeckFormInputs
          title={title}
          setTitle={setTitle}
          newTag={newTag}
          setNewTag={setNewTag}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          tags={tags}
          isError={isError}
        />

        <IconButton
          src="/plus-solid.svg"
          height={18}
          width={18}
          alt="Add Icon"
          text="Add deck"
          handleClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default NewDeck;
