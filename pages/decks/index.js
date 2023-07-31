import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import { getAllDecks } from "../../lib/decks";
import NewDeck from "../../components/deckForms/newDeck";
import LoadingBar from "../../components/shared/loadingBar";
import SearchFilter from "../../components/searchBar/searchFilter";
import ErrorSection from "../../components/shared/errorSection";
import DeckCardLink from "../../components/decks/deckCardLink";
import utilStyles from "../../styles/utils.module.css";

const Decks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDeck, setIsAddDeck] = useState(false);
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [tagFilters, setTagFilters] = useState([]);
  const [decksData, setDecksData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllDecks(user);
      setDecksData(data);
      setIsLoading(false);
    };

    if (user) {
      setIsLoading(true);
      getData();
    }
  }, [user]);

  const handleModal = () => {
    if (isAddDeck) {
      setIsAddDeck(false);
      document.body.style.overflow = "auto";
    } else {
      setIsAddDeck(true);
      document.body.style.overflow = "hidden";
    }
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
        <title>Decks</title>
      </Head>

      {!user && (
        <ErrorSection text="You have to be logged in to manage your decks" />
      )}

      {user && isLoading && <LoadingBar />}

      {user && !isLoading && (
        <section className={`${utilStyles.section} ${utilStyles.stopScroll}`}>
          <div className={utilStyles.landing}>
            <h1 className={utilStyles.title}>Decks</h1>
            <button className={utilStyles.landingBtn} onClick={handleModal}>
              <Image
                priority
                src="/plus-solid.svg"
                height={25}
                width={25}
                alt="New Card Icon"
              />
            </button>
          </div>

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
              .map(({ id, title, tags }) => (
                <DeckCardLink key={id} title={title} tags={tags} />
              ))}
          </div>
        </section>
      )}

      {user && isAddDeck && <NewDeck handleModal={handleModal} />}
    </>
  );
};

export default Decks;
