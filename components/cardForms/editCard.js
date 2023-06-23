import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllDecks, updateCard, moveCard, copyCard } from "../../lib/decks";
import CardFormInputs from "./cardFormInputs";
import EditCardMove from "./editCardMove";
import EditCardCopy from "./editCardCopy";
import IconButton from "../shared/iconButton";
import "easymde/dist/easymde.min.css";
import utilStyles from "../../styles/utils.module.css";

const EditCard = ({
  deckData,
  card,
  cardId,
  handleSetCardView,
  handleMoveView,
}) => {
  const { user } = useAuth();
  const [cardFront, setCardFront] = useState(card.front);
  const [cardContent, setCardContent] = useState(card.contentMd);
  const [allDecks, setAllDecks] = useState([]);
  const [copyDropdown, setCopyDropdown] = useState(false);
  const [moveDropdown, setMoveDropdown] = useState(false);
  const [copyChecked, setCopyChecked] = useState([]);
  const [moveChecked, setMoveChecked] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDecks = async () => {
      const data = await getAllDecks(user);
      setAllDecks(data);
    };
    if (user) {
      fetchDecks();
    }
  }, []);

  const handleCopyCheck = (deckId) => {
    if (copyChecked.includes(deckId)) {
      setCopyChecked((prevCopyChecked) =>
        prevCopyChecked.filter((checkedId) => checkedId !== deckId)
      );
    } else {
      setCopyChecked((prevCopyChecked) => [...prevCopyChecked, deckId]);
    }
  };

  const handleCopy = async (e) => {
    e.preventDefault();

    if (copyChecked.length > 0) {
      await copyCard(copyChecked, deckData.dbCards[cardId]);
      handleSetCardView();
    }
  };

  const handleMove = async (e) => {
    e.preventDefault();

    if (moveChecked) {
      await moveCard(deckData.deckId, moveChecked, deckData.dbCards[cardId]);
      handleMoveView();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cardFront !== "" && cardContent !== "") {
      const updatedCard =
        `---\nfront: "` +
        cardFront +
        `"\n---\n\n` +
        cardContent.replaceAll("-----", "---");

      await updateCard(deckData, cardId, updatedCard);
      handleSetCardView();
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={utilStyles.modal}>
      <span
        onClick={handleSetCardView}
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
        {/* CARD CONTENT INPUTS */}
        <CardFormInputs
          cardFront={cardFront}
          setCardFront={setCardFront}
          cardContent={cardContent}
          setCardContent={setCardContent}
          isError={isError}
        />

        {/* COPY TO ANOTHER DECK */}
        <IconButton
          src="/copy-solid.svg"
          height={18}
          width={18}
          alt="Copy Icon"
          text="Copy to another deck"
          handleClick={() =>
            setCopyDropdown((prevCopyDropdown) => !prevCopyDropdown)
          }
        />
        {copyDropdown && allDecks && (
          <EditCardCopy
            allDecks={allDecks}
            deckData={deckData}
            copyChecked={copyChecked}
            handleCopyCheck={handleCopyCheck}
            handleCopy={handleCopy}
          />
        )}

        {/* MOVE TO ANOTHER DECK */}
        <IconButton
          src="/file-export-solid.svg"
          height={18}
          width={18}
          alt="Move Icon"
          text="Move to another deck"
          handleClick={() =>
            setMoveDropdown((prevMoveDropdown) => !prevMoveDropdown)
          }
        />
        {moveDropdown && allDecks && (
          <EditCardMove
            allDecks={allDecks}
            deckData={deckData}
            moveChecked={moveChecked}
            setMoveChecked={setMoveChecked}
            handleMove={handleMove}
          />
        )}

        {/* SAVE CHANGES */}
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

export default EditCard;
