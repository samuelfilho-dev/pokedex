import { Pokemon } from "./types/pokemon";

const buttonPrev = document.querySelector(".btn-prev")! as HTMLButtonElement;
const buttonNext = document.querySelector(".btn-next")! as HTMLButtonElement;
const pokemonName = document.querySelector(".pokemon-name")! as HTMLElement;
const pokemonNumber = document.querySelector(".pokemon-number")! as HTMLElement;
const pokemonForm = document.querySelector(".pokemon-form")! as HTMLFormElement;
const pokemonImage = document.querySelector(
  ".pokemon-image"
)! as HTMLImageElement;
const inputSearch = document.querySelector(
  ".input-search"
)! as HTMLInputElement;

let searchPokemon = 1;

pokemonForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  renderPokemon(inputSearch.value);
  inputSearch.value = "";
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon.toString());
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon.toString());
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
    searchPokemon = +data.id;
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id.toString();
    pokemonImage.src =
      data.sprites.versions["generation-v"][
        "black-white"
      ].animated.front_default;
  } else {
    pokemonName.innerHTML = "Not Found";
    pokemonNumber.innerHTML = "404";
    pokemonImage.style.display = "none";
  }
};

renderPokemon(searchPokemon.toString());
