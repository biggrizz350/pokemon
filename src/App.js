import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);

  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)), //cancels the previous request, useful when the request is no longer needed
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name)); // res is the response from the API
        //setPokemon(res.data.results.map((p) => p.front_default))
        //setPokemonImg(res.data.results.map((i)=> i.front_default));
      });
    return () => {
      cancel();
    }; //cancels a request whenever a new one is made with an old one
  }, [currentPageUrl]); //everytime currentPageUrl changes, rerender, if it doesn't don't run that code.


  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }
  



  if (loading) return "Loading..."; // if loading is true, the message is printed

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
      gotoNextPage={nextPageUrl ? gotoNextPage : null}  //ternary operator, if nothing is there, nothing gets passed
      gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
    </>
  );
}

//this a test change

export default App;
