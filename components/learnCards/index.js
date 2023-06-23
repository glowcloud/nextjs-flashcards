import { useState } from "react";
import { updateReviews } from "../../lib/decks";
import CardContent from "../viewCard/cardContent";
import LearnMatchResults from "../shared/learnMatchResults";
import IconButton from "../shared/iconButton";
import styles from "./learnCards.module.css";
import utilStyles from "../../styles/utils.module.css";

const shuffleCards = (decks) => {
  let shuffledCards = [];

  decks.forEach((deck, index) => {
    deck.cards.forEach((card) => {
      let correctReviews = 0;

      card.reviews.forEach((review) => {
        if (review.wasCorrect) correctReviews++;
      });

      const reviewsRatio = correctReviews / card.reviews.length;

      let cardCount = 0;

      if (reviewsRatio >= 0.9) {
        cardCount = 1;
      } else if (reviewsRatio >= 0.75) {
        cardCount = 2;
      } else if (reviewsRatio >= 0.5) {
        cardCount = 3;
      } else {
        cardCount = 4;
      }

      for (let i = 0; i < cardCount; i++) {
        shuffledCards.push({
          ...card,
          deckId: index,
        });
      }
    });
  });

  for (let i = shuffledCards.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[i],
    ];
  }

  return shuffledCards;
};

const LearnCards = ({ decks, setIsLearn }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [currentSide, setCurrentSide] = useState(-1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [cards, setCards] = useState(shuffleCards(decks));

  const handleCorrect = async () => {
    await updateReviews(
      decks[cards[currentCard].deckId],
      cards[currentCard].originalId,
      true
    );
    setCorrectAnswers((prevCorrect) => prevCorrect + 1);
    setCurrentSide(-1);
    setCurrentCard((prevCard) => prevCard + 1);
  };

  const handleIncorrect = async () => {
    const updatedReviews = await updateReviews(
      decks[cards[currentCard].deckId],
      cards[currentCard].originalId,
      false
    );
    setCards((prevCards) => [
      ...prevCards,
      { ...prevCards[currentCard], reviews: updatedReviews },
    ]);
    setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1);
    setCurrentSide(-1);
    setCurrentCard((prevCard) => prevCard + 1);
  };

  const handleClose = () => {
    setIsLearn(false);
  };

  return (
    <div className={utilStyles.modal}>
      <span
        onClick={handleClose}
        className={utilStyles.close}
        title="Close Modal"
      >
        &times;
      </span>

      {currentCard < cards.length && (
        <div className={utilStyles.content}>
          <CardContent
            card={cards[currentCard]}
            currentSide={currentSide}
            setCurrentSide={setCurrentSide}
          />
          <div className={styles.controls}>
            <IconButton
              src="/xmark-solid.svg"
              height={18}
              width={18}
              alt="Incorrect Icon"
              handleClick={handleIncorrect}
            />
            <IconButton
              src="/check-solid.svg"
              height={18}
              width={18}
              alt="Correct Icon"
              handleClick={handleCorrect}
            />
          </div>
        </div>
      )}

      {currentCard >= cards.length &&
        (cards.length > 0 ? (
          <LearnMatchResults
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            handleClose={handleClose}
          />
        ) : (
          <LearnMatchResults handleClose={handleClose} />
        ))}
    </div>
  );
};

export default LearnCards;
