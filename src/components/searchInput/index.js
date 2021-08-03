import "../button/button.css";
const SearchData = ({ placeholder, onChange, onClick }) => {
  return (
    <>
      <input
        className="search-input"
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      ></input>
      <button className="btn" onClick={onClick}>
        Search
      </button>
    </>
  );
};

export default SearchData;
