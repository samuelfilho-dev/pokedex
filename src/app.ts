import { Pokemon } from "./types/pokemon";

const pokemonName = document.querySelector(".pokemon-name")! as HTMLElement;
const pokemonNumber = document.querySelector(".pokemon-number")! as HTMLElement;
const pokemonForm = document.querySelector(".pokemon-form")! as HTMLFormElement;
const pokemonImage = document.querySelector(
  ".pokemon-image"
)! as HTMLImageElement;
const inputSearch = document.querySelector(
  ".input-search"
)! as HTMLInputElement;

pokemonForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  renderPokemon(inputSearch.value);
  inputSearch.value = "";
});

const fetchPokemon = async (pokemon: string) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const pokemonApiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
  );

  if (pokemonApiResponse.status === 200) {
    const data: Pokemon = await pokemonApiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon: string) => {
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id.toString();
    pokemonImage.src =
      data.sprites.versions["generation-v"][
        "black-white"
      ].animated.front_default;
  } else {
    pokemonName.innerHTML = "Not Found";
    pokemonNumber.innerHTML = "404";
    pokemonImage.src = "";
  }
};

renderPokemon('1');