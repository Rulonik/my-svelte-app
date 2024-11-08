<script>
  import axios from "axios";

  let search = "";
  let limit = 10;
  let pokemons = [];

  // Funkcja do pobierania Pokémonów z API
  async function getPokemons() {
    const { data } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    pokemons = data.results.map(({ name }, index) => {
      return {
        id: index + 1,
        name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`,
        subpage: `/#/pokemon/${index + 1}`, // Link do strony szczegółowej Pokémona
      };
    });
  }

  // Funkcja do filtrowania Pokémonów po nazwie
  function filterPokemons() {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Ładowanie Pokémonów
  $: getPokemons();
</script>

<div class="container flex flex-grow justify-center mx-auto flex-col">
  <div class="mb-6">
    <input
      type="text"
      placeholder="Search by name"
      bind:value={search}
      class="p-2 border border-gray-300 rounded"
    />
    <input
      type="number"
      placeholder="Limit"
      min="1"
      bind:value={limit}
      class="p-2 border border-gray-300 rounded ml-2"
    />
  </div>

  <div class="grid grid-cols-5 mx-auto gap-10">
    {#await getPokemons() then data}
      {#each filterPokemons().slice(0, limit) as pokemon}
        <div class="bg-gray-100 p-6 rounded-lg">
          <img
            class="h-40 rounded w-full object-cover object-fit mb-6"
            src={pokemon.image}
            alt={pokemon.name}
          />
          <h3
            class="tracking-widest text-indigo-500 text-xs font-medium title-font"
          >
            {pokemon.name}
          </h3>
          <!-- Link do strony szczegółowej -->
          <a href={pokemon.subpage} class="text-blue-500">Read more</a>
        </div>
      {/each}
    {/await}
  </div>
</div>
