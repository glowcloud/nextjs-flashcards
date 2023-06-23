import { useState } from "react";
import MatchCardsRow from "./matchCardsRow";
import LearnMatchResults from "../shared/learnMatchResults";
import IconButton from "../shared/iconButton";
import styles from "./matchCards.module.css";
import utilStyles from "../../styles/utils.module.css";

const shuffleCards = (cards) => {
  const shuffledCards = cards.concat();

  for (let i = shuffledCards.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[i],
    ];
  }

  return shuffledCards;
};

const MatchCards = ({ deckCards, setIsMatch }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [currentCards, setCurrentCards] = useState({
    frontCards: [],
    backCards: [],
  });
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [frontChoice, setFrontChoice] = useState(null);
  const [backChoice, setBackChoice] = useState(null);
  const [guessedFrontCards, setGuessedFrontCards] = useState([]);
  const [guessedBackCards, setGuessedBackCards] = useState([]);
  const [missedFrontCards, setMissedFrontCards] = useState([]);
  const [missedBackCards, setMissedBackCards] = useState([]);

  const handleDraw = () => {
    const chosenCards = [];
    const chosenIndexes = [];

    while (
      chosenCards.length < 5 &&
      usedIndexes.length + chosenIndexes.length < deckCards.length
    ) {
      let randomIndex = Math.floor(Math.random() * deckCards.length);

      if (
        !usedIndexes.includes(randomIndex) &&
        !chosenIndexes.includes(randomIndex)
      ) {
        chosenCards.push(deckCards[randomIndex]);
        chosenIndexes.push(randomIndex);
      }
    }

    setGuessedFrontCards([]);
    setGuessedBackCards([]);
    setMissedFrontCards([]);
    setMissedBackCards([]);
    setUsedIndexes((prevIndexes) => prevIndexes.concat(chosenIndexes));
    setCurrentCards({
      frontCards: chosenCards,
      backCards: shuffleCards(chosenCards),
    });
  };

  const handleBackClick = (index) => {
    if (frontChoice !== null) {
      if (
        currentCards.frontCards[frontChoice].front ===
        currentCards.backCards[index].front
      ) {
        setGuessedBackCards((prevGuessed) => [...prevGuessed, index]);
        setGuessedFrontCards((prevGuessed) => [...prevGuessed, frontChoice]);
        if (missedBackCards.includes(index)) {
          setMissedBackCards((prevMissed) =>
            prevMissed.filter((id) => id !== index)
          );
        }
        if (missedFrontCards.includes(frontChoice)) {
          setMissedFrontCards((prevMissed) =>
            prevMissed.filter((id) => id !== frontChoice)
          );
        }
        setFrontChoice(null);
        setBackChoice(null);
        setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      } else {
        setMissedBackCards((prevMissed) => [...prevMissed, index]);
        setMissedFrontCards((prevMissed) => [...prevMissed, frontChoice]);
        setFrontChoice(null);
        setBackChoice(null);
        setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1);
      }
    } else {
      if (backChoice === index) {
        setBackChoice(null);
      } else {
        setBackChoice(index);
      }
    }
  };

  const handleFrontClick = (index) => {
    if (backChoice !== null) {
      if (
        currentCards.backCards[backChoice].front ===
        currentCards.frontCards[index].front
      ) {
        setGuessedFrontCards((prevGuessed) => [...prevGuessed, index]);
        setGuessedBackCards((prevGuessed) => [...prevGuessed, backChoice]);
        if (missedBackCards.includes(backChoice)) {
          setMissedBackCards((prevMissed) =>
            prevMissed.filter((id) => id !== backChoice)
          );
        }
        if (missedFrontCards.includes(index)) {
          setMissedFrontCards((prevMissed) =>
            prevMissed.filter((id) => id !== index)
          );
        }
        setFrontChoice(null);
        setBackChoice(null);
        setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      } else {
        setMissedFrontCards((prevMissed) => [...prevMissed, index]);
        setMissedBackCards((prevMissed) => [...prevMissed, backChoice]);
        setFrontChoice(null);
        setBackChoice(null);
        setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1);
      }
    } else {
      if (frontChoice === index) {
        setFrontChoice(null);
      } else {
        setFrontChoice(index);
      }
    }
  };

  return (
    <div className={utilStyles.modal}>
      <span
        onClick={() => setIsMatch(false)}
        className={utilStyles.close}
        title="Close Modal"
      >
        &times;
      </span>

      {currentCards.frontCards.length === 0 &&
        usedIndexes.length !== deckCards.length && (
          <div className={`${utilStyles.content} ${styles.play}`}>
            <IconButton
              src="/circle-play-solid.svg"
              height={18}
              width={18}
              alt="Play Icon"
              text="Play"
              handleClick={handleDraw}
            />
          </div>
        )}

      {currentCards.frontCards.length > 0 && (
        <div className={utilStyles.content}>
          {currentCards.frontCards.map((current, index) => (
            <MatchCardsRow
              index={index}
              cardFront={current.front}
              cardBack={currentCards.backCards[index]}
              missedFrontCards={missedFrontCards}
              guessedFrontCards={guessedFrontCards}
              frontChoice={frontChoice}
              handleFrontClick={handleFrontClick}
              missedBackCards={missedBackCards}
              guessedBackCards={guessedBackCards}
              backChoice={backChoice}
              handleBackClick={handleBackClick}
            />
          ))}

          {guessedFrontCards.length === currentCards.frontCards.length &&
            usedIndexes.length < deckCards.length && (
              <IconButton
                src="/right-long-solid.svg"
                height={18}
                width={18}
                alt="Next Icon"
                text="Draw more cards"
                handleClick={handleDraw}
              />
            )}

          {guessedFrontCards.length === currentCards.frontCards.length &&
            usedIndexes.length === deckCards.length && (
              <IconButton
                src="/eye-solid.svg"
                height={18}
                width={18}
                alt="See Icon"
                text="See results"
                handleClick={handleDraw}
              />
            )}
        </div>
      )}

      {currentCards.frontCards.length === 0 &&
        usedIndexes.length === deckCards.length &&
        (usedIndexes.length > 0 ? (
          <LearnMatchResults
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            handleClose={() => setIsMatch(false)}
          />
        ) : (
          <LearnMatchResults handleClose={() => setIsMatch(false)} isMatch />
        ))}
    </div>
  );
};

export default MatchCards;
