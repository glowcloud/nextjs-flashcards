import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { getDeckData, deleteDeck, deleteCard } from "../../lib/decks";
import DeckDropdown from "../../components/deck/deckDropdown";
import LearnCards from "../../components/learnCards";
import MatchCards from "../../components/matchCards";
import Search from "../../components/searchBar/search";
import LoadingBar from "../../components/shared/loadingBar";
import ErrorSection from "../../components/shared/errorSection";
import ConfirmDialog from "../../components/shared/confirmDialog";
import styles from "../../styles/Deck.module.css";
import ViewCard from "../../components/viewCard";
import EditDeck from "../../components/deckForms/editDeck";
import EditCard from "../../components/cardForms/editCard";
import NewCard from "../../components/cardForms/newCard";
import utilStyles from "../../styles/utils.module.css";

const Deck = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddCard, setIsAddCard] = useState(false);
  const [cardView, setCardView] = useState(-1);
  const [cardEdit, setCardEdit] = useState(-1);
  const [isEditDeck, setIsEditDeck] = useState(false);
  const [isLearn, setIsLearn] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [search, setSearch] = useState("");
  const [deckData, setDeckData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const data = await getDeckData(router.query.id, user);
      setDeckData(data);
      setIsLoading(false);
    };

    if (user && !isLearn && cardEdit === -1 && !isEditDeck && !isAddCard) {
      setIsLoading(true);
      getData();
    }
  }, [user, router.asPath, isLearn, cardEdit, isEditDeck, isAddCard, cardView]);

  useEffect(() => {
    if (
      !isLearn &&
      !isEditDeck &&
      !isAddCard &&
      !isMatch &&
      cardEdit === -1 &&
      cardView === -1
    ) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isLearn, isMatch, isEditDeck, isAddCard, cardEdit, cardView]);

  const handleDelete = async () => {
    await deleteDeck(deckData.deckId);
    router.replace("/decks");
  };

  const handleCardDelete = async (cardId) => {
    await deleteCard(deckData.deckId, deckData.dbCards[cardId]);
  };

  const handleSetCardEdit = (cardId) => {
    setCardEdit(cardId);
    setCardView(-1);
  };

  const handleSetCardView = (cardId) => {
    setCardView(cardId);
    setCardEdit(-1);
  };

  const handleMoveView = () => {
    setCardView(-1);
    setCardEdit(-1);
  };

  return (
    <>
      <Head>
        <title>{deckData ? deckData.title : "Deck not found"}</title>
      </Head>

      {!user && (
        <ErrorSection text="You have to be logged in to see this decks" />
      )}

      {user && isLoading && <LoadingBar />}

      {user && !isLoading && !deckData && (
        <ErrorSection text="Deck not found" />
      )}

      {user && !isLoading && deckData && (
        <section>
          <div className={utilStyles.landing}>
            <h1 className={utilStyles.title}>{deckData.title}</h1>

            <div>
              <button
                className={utilStyles.landingBtn}
                onClick={() => setShowOptions((prevShow) => !prevShow)}
              >
                <Image
                  priority
                  src="/ellipsis-vertical-solid.svg"
                  height={10}
                  width={10}
                  alt="Options Icon"
                />
              </button>
              {showOptions && (
                <DeckDropdown
                  setIsAddCard={setIsAddCard}
                  setIsLearn={setIsLearn}
                  setIsMatch={setIsMatch}
                  setIsEditDeck={setIsEditDeck}
                  setIsConfirm={setIsConfirm}
                />
              )}
            </div>
          </div>

          <div className={utilStyles.tags}>
            {deckData.tags &&
              deckData.tags.map((tag) => <small key={tag}>#{tag} </small>)}
          </div>

          {isAddCard && (
            <NewCard deckData={deckData} setIsAddCard={setIsAddCard} />
          )}

          <div className={styles.search}>
            <Search search={search} setSearch={setSearch} />
          </div>

          {/* CARDS */}
          {deckData.cards
            .filter(
              (card) =>
                card.front.toLowerCase().includes(search.toLowerCase()) ||
                card.contentMd.toLowerCase().includes(search.toLowerCase())
            )
            .map((card) => (
              <div
                key={card.originalId}
                className={utilStyles.card}
                onClick={() => setCardView(card.originalId)}
              >
                <h2>{card.front}</h2>
              </div>
            ))}

          {cardView !== -1 && (
            <ViewCard
              card={deckData.cards[cardView]}
              setCardView={setCardView}
              handleCardDelete={() => handleCardDelete(cardView)}
              handleSetCardEdit={() => handleSetCardEdit(cardView)}
            />
          )}

          {cardEdit !== -1 && (
            <EditCard
              deckData={deckData}
              card={deckData.cards[cardEdit]}
              cardId={cardEdit}
              handleSetCardView={() => handleSetCardView(cardEdit)}
              handleMoveView={handleMoveView}
            />
          )}

          {isEditDeck && (
            <EditDeck deck={deckData} setIsEditDeck={setIsEditDeck} />
          )}

          {isLearn && <LearnCards decks={[deckData]} setIsLearn={setIsLearn} />}

          {isMatch && (
            <MatchCards deckCards={deckData.cards} setIsMatch={setIsMatch} />
          )}

          {isConfirm && (
            <ConfirmDialog
              setConfirmDialog={setIsConfirm}
              handleConfirm={handleDelete}
              text="Are you sure you want to delete this deck?"
            />
          )}
        </section>
      )}
    </>
  );
};

export default Deck;
