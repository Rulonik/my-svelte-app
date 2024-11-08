import { writable } from "svelte/store";

export let loadPokemons = writable([]);

const urlPokeApi = "https://pokeapi.co/api/v2/pokemon?limit=100";
const urlPokeImg =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

const fetchData = async () => {
  const res = await fetch(urlPokeApi);
  const data = (await res.json()).results;

  const myPokemon = data.map((data, index) => {
    return {
      name: data.name,
      url: data.url,
      id: index + 1,
      img: `${urlPokeImg}${index + 1}.svg`,
    };
  });

  loadPokemons.set(myPokemon);
  localStorage.setItem("pokemons", JSON.stringify(myPokemon));
};

const cachedPokemons = localStorage.getItem("pokemons");
if (cachedPokemons) {
  loadPokemons.set(JSON.parse(cachedPokemons));
} else {
  fetchData();
}
