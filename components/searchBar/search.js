const Search = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      id="search"
      name="search"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      autoComplete="off"
    />
  );
};

export default Search;
