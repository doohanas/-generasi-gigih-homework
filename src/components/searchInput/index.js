const SearchData = ({placeholder, onChange, onClick}) => {
    return(
        <>
            <input className="search-input" type="text"onChange={onChange} placeholder={placeholder}></input>
            <button className="search-input" onClick={onClick}>Search</button>
        </>
    )
};

export default SearchData
 
