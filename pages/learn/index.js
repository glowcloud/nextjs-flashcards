import Head from "next/head";
import { getAllDecksData } from "../../lib/decks";
import utilStyles from "../../styles/utils.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MatchCards from "../../components/matchCards";
import LearnCards from "../../components/learnCards";
import LoadingBar from "../../components/shared/loadingBar";
import SearchFilter from "../../components/searchBar/searchFilter";
import ErrorSection from "../../components/shared/errorSection";
import LearnButtons from "../../components/learn/learnButtons";
import DeckCard from "../../components/learn/deckCard";

const Learn = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tagFilters, setTagFilters] = useState([]);
  const [selectedDecks, setSelectedDecks] = useState([]);
  const [isLearn, setIsLearn] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [decksData, setDecksData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllDecksData(user);
      setDecksData(data);
      setIsLoading(false);
    };

    if (user && !isLearn) {
      setIsLoading(true);
      getData();
    }
  }, [user, isLearn]);

  useEffect(() => {
    if (!isLearn && !isMatch) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isLearn, isMatch]);

  const getSelectedDecks = () => {
    const decks = [];

    decksData.forEach((deck) => {
      if (selectedDecks.includes(deck.deckId)) {
        decks.push(deck);
      }
    });

    return decks;
  };

  const getSelectedCards = () => {
    const cards = [];

    decksData.forEach((deck) => {
      if (selectedDecks.includes(deck.deckId)) {
        cards.push(...deck.cards);
      }
    });

    return cards;
  };

  const handleDeckChoice = (id) => {
    if (selectedDecks.includes(id)) {
      setSelectedDecks((prevDecks) =>
        prevDecks.filter((deckId) => deckId !== id)
      );
    } else {
      setSelectedDecks((prevDecks) => [...prevDecks, id]);
    }
  };

  const handleSelectAll = () => {
    const newDecks = [];

    decksData
      .filter(
        (deck) =>
          deck.title.toLowerCase().includes(search.toLowerCase()) &&
          (tagFilters.length === 0 ||
            (tagFilters.length > 0 &&
              tagFilters.every((tag) => deck.tags.includes(tag))))
      )
      .forEach((deck) => {
        newDecks.push(deck.deckId);
      });

    setSelectedDecks(newDecks);
  };

  const handleFilter = (tag) => {
    if (tagFilters.includes(tag)) {
      setTagFilters((prevTagFilters) =>
        prevTagFilters.filter((tagFilter) => tagFilter !== tag)
      );
    } else {
      setTagFilters((prevTagFilters) => [...prevTagFilters, tag]);
    }
  };

  return (
    <>
      <Head>
        <title>Learn</title>
      </Head>

      {!user && (
        <ErrorSection text="You have to be logged in to learn your decks" />
      )}

      {user && isLoading && <LoadingBar />}

      {user && !isLoading && decksData.length === 0 && (
        <ErrorSection text="No deck found" />
      )}

      {user && !isLoading && decksData.length > 0 && (
        <section className={utilStyles.section}>
          <h1 className={utilStyles.title}>Learn</h1>

          <LearnButtons
            setIsLearn={setIsLearn}
            setIsMatch={setIsMatch}
            handleSelectAll={handleSelectAll}
            setSelectedDecks={setSelectedDecks}
          />

          <SearchFilter
            decksData={decksData}
            search={search}
            setSearch={setSearch}
            tagFilters={tagFilters}
            handleFilter={handleFilter}
          />

          <div className={utilStyles.grid}>
            {decksData
              .filter(
                (deck) =>
                  deck.title.toLowerCase().includes(search.toLowerCase()) &&
                  (tagFilters.length === 0 ||
                    (tagFilters.length > 0 &&
                      tagFilters.every((tag) => deck.tags.includes(tag))))
              )
              .map(({ deckId, title, tags }) => (
                <DeckCard
                  deckId={deckId}
                  selectedDecks={selectedDecks}
                  handleDeckChoice={handleDeckChoice}
                  title={title}
                  tags={tags}
                />
              ))}
          </div>

          {isMatch && (
            <MatchCards
              deckCards={getSelectedCards()}
              setIsMatch={setIsMatch}
            />
          )}

          {isLearn && (
            <LearnCards decks={getSelectedDecks()} setIsLearn={setIsLearn} />
          )}
        </section>
      )}
    </>
  );
};

export default Learn;
