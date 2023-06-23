import { useState } from "react";
import { useRouter } from "next/router";
import { updateDeck, deleteCard } from "../../lib/decks";
import DeckFormInputs from "./deckFormInputs";
import EditDeckCards from "./editDeckCards";
import IconButton from "../shared/iconButton";
import utilStyles from "../../styles/utils.module.css";

const EditDeck = ({ deck, setIsEditDeck }) => {
  const [title, setTitle] = useState(deck.title);
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState(deck.tags);
  const [isDeleteCards, setIsDeleteCards] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prevTags) => [...prevTags, newTag]);
    }
    setNewTag("");
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((tag, id) => id !== index));
  };

  const handleCardChoice = (id) => {
    if (selectedCards.includes(id)) {
      setSelectedCards((prevCards) =>
        prevCards.filter((cardId) => cardId !== id)
      );
    } else {
      setSelectedCards((prevCards) => [...prevCards, id]);
    }
  };

  const handleDeleteSelected = async () => {
    selectedCards.forEach(
      async (cardId) => await deleteCard(deck.deckId, deck.dbCards[cardId])
    );
    router.replace(router.asPath);
    setIsEditDeck(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "") {
      await updateDeck(deck.deckId, { title, tags });

      router.replace(`/decks/${deck.deckId}`);

      setIsEditDeck(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={utilStyles.modal}>
      <span
        onClick={() => setIsEditDeck(false)}
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
          src="/list-check-solid.svg"
          height={18}
          width={18}
          alt="Manage Icon"
          text="Manage cards"
          handleClick={() => setIsDeleteCards((prevDelete) => !prevDelete)}
        />

        {isDeleteCards && (
          <EditDeckCards
            cards={deck.cards}
            selectedCards={selectedCards}
            handleCardChoice={handleCardChoice}
            handleDeleteSelected={handleDeleteSelected}
          />
        )}

        <IconButton
          src="/circle-check-solid.svg"
          height={18}
          width={18}
          alt="Confirm Icon"
          text="Save changes"
          handleClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default EditDeck;
