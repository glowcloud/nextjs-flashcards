import { useState } from "react";
import { useRouter } from "next/router";
import { addCard } from "../../lib/decks";
import CardFormInputs from "./cardFormInputs";
import IconButton from "../shared/iconButton";
import "easymde/dist/easymde.min.css";
import utilStyles from "../../styles/utils.module.css";

const NewCard = ({ deckData, setIsAddCard }) => {
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardContent, setNewCardContent] = useState("");
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newCardFront !== "" && newCardContent !== "") {
      const newCard =
        `---\nfront: "` +
        newCardFront +
        `"\n---\n\n` +
        newCardContent.replaceAll("-----", "---");

      await addCard(deckData.deckId, newCard);
      router.replace(router.asPath);
      setIsAddCard(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={utilStyles.modal}>
      <span
        onClick={() => setIsAddCard(false)}
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
        <CardFormInputs
          cardFront={newCardFront}
          setCardFront={setNewCardFront}
          cardContent={newCardContent}
          setCardContent={setNewCardContent}
          isError={isError}
        />

        <IconButton
          src="/plus-solid.svg"
          height={18}
          width={18}
          alt="Add Icon"
          text="Add card"
          handleClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default NewCard;
