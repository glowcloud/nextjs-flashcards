import { useState } from "react";
import Image from "next/image";
import Search from "./search";
import styles from "./searchFilter.module.css";

const SearchFilter = ({
  decksData,
  search,
  setSearch,
  tagFilters,
  handleFilter,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const getUniqueTags = () => {
    const tags = [];
    decksData
      .filter((deck) => deck.title.toLowerCase().includes(search.toLowerCase()))
      .map((deck) => {
        if (deck.tags) {
          tags.push(...deck.tags);
        }
      });
    const unique = [...new Set(tags)];
    return unique.map((tag) => (
      <label key={tag} className={styles.checkbox}>
        <input
          id={tag}
          type="checkbox"
          checked={tagFilters.includes(tag)}
          onChange={() => handleFilter(tag)}
        />
        <label htmlFor={tag}>{tag}</label>
      </label>
    ));
  };

  return (
    <div className={styles.search}>
      <Search search={search} setSearch={setSearch} />

      <div className={styles.filter}>
        <button onClick={() => setShowFilters((prevShow) => !prevShow)}>
          <Image
            priority
            src="/filter-solid.svg"
            height={28}
            width={28}
            alt="Filter Icon"
          />
        </button>
        {showFilters && (
          <div className={styles.dropdown}>{getUniqueTags()}</div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
