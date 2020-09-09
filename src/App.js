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
    <div className="row">
      <form onSubmit={handleSubmit}>
        <input value={userSearchTerms} onChange={handleChange} />
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
        <Youtube onBlur={handleBlur} VideoId={selectedVideoId} opts={opts} />
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <SearchRow />
      <SearchRow />
      <SearchRow />
    </div>
  );
}

export default App;
