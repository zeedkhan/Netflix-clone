import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // title comes from App.js
  const [movies, setMovies] = useState([]); // moviescreen is variables, State is keep a short-term memory and inside () call initial this case we gave an array and we will have empty movie array
  const [trailerUrl, setTrailerUrl] = useState("");
  // A snippet of code which runs based on a specific codition/varaible load the code and appear information in the web via the request api
  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    async function fetchData() {
      const request = await axios.get(fetchUrl); // Wait for get the information from the server and then do the condition "https://api.themoviedb.org/3",
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // [fetchUrl] this line is use variable outside the blocks cuz useEffect() change we have to refile the code

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/* use string concatenation  >>>. everything give the real poster but if it is a large row then bigger */}
        {/* several row_posters(s) map is gonna go through araay list movies or called object */}
        {movies.map((movie) => (
          <img
            key={movie.id} //render individual movie, give a indentity of each movie via their id. It will make you scroll faster
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          /> // Go get the image of the movie we call poster_path but if no images return the name intead
          // {isLargeRow ? is making the Netflix Original bigger than the others
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
