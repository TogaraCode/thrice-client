import React, { useState, useEffect } from "react";
import "./App.css";
import Youtube from "react-youtube";

function SearchRow() {
  const [userSearchTerms, setUserSearchTerms] = useState("");
  const [results, setResults] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState();

  const opts = {
    height: "590",
    width: "100%",

    playerVars: {
      //https://developers.google.com/youtube.player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (e) => {
    const id = e.target.id;
    console.log(id);
    setSelectedVideoId(id);
  };

  useEffect(() => {
    console.log(results);
  }, [results]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `fetching ${process.env.REACT_APP_SERVER}/search/${userSearchTerms}`
    );
    fetch(`${process.env.REACT_APP_SERVER}/search/${userSearchTerms}`)
      .then((res) => res.json())
      .then((res) => setResults(res));
  };
  const handleBlur = (e) => {
    setSelectedVideoId(null);
  };
  const handleChange = (e) => {
    setUserSearchTerms(e.target.value);
  };
  return (
    <div>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <input
            value={userSearchTerms}
            onChange={handleChange}
            className="search"
            placeholder="Search bar......"
          />
          <button className="search-button">Search</button>
        </form>
        <ul className="row__posters">
          {results.map((r) => (
            <img
              id={r.id}
              onClick={handleClick}
              className="row__poster"
              src={r.thumbnails.high.url}
              alt=""
            />
          ))}
        </ul>
        {selectedVideoId && (
          <Youtube videoId={selectedVideoId} onBlur={handleBlur} opts={opts} />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="header">
        {" "}
        <img src="../togaraNerdsIcon.jpg" className="logo" /> <h1>Thrice</h1>
      </div>
      <SearchRow />
      <SearchRow />
      <SearchRow />
    </div>
  );
}

export default App;
