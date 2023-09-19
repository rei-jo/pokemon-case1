async function fetchData() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon", {
    method: "GET"
  });
  const data = await res.json();
  
  return data.results;
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value;

  createPokemonCards(searchTerm);
});

async function createPokemonCards(filter = "") {
  const cardContainer = document.getElementById("card-container");
  const pokemons = await fetchData();

  cardContainer.innerHTML = ""

  pokemons.forEach((pokemon, index) => {
    if (pokemon.name.toLowerCase().includes(filter.toLowerCase())) {
      const column = document.createElement("div");
      column.classList.add("col", "mb-3");

      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = pokemon.name;

      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.textContent = `ID: ${index + 1}`;

      const cardLink = document.createElement("a");
      cardLink.classList.add("btn", "btn-dark");
      cardLink.href = pokemon.url;
      cardLink.textContent = "Detail";

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cardLink);

      card.appendChild(cardBody);

      column.appendChild(card);

      cardContainer.appendChild(column);
    }
  });
}

createPokemonCards();