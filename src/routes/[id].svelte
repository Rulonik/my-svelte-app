<script>
  export let params = {};
  $: pokemonId = params.id;

  async function getDetailsById(id) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const data = await (await fetch(URL)).json();
    return data;
  }
</script>

{#await getDetailsById(pokemonId) then details}
  <div
    class="pokemon-container"
    style="display:flex;justify-content:center;align-items:center;flex-direction:column;"
  >
    <img
      src={details.sprites.other["official-artwork"].front_default}
      alt={details.name}
      class="pokemon-image"
    />

    <div class="pokemon-name">{details.name}</div>

    <div class="pokemon-types">
      {#each details.types as { type }}
        <span>{type.name}</span>
      {/each}
    </div>

    {#if details.species}
      <p class="pokemon-description">{details.species.name}</p>
    {/if}

    <div class="pokemon-stats">
      <p><span class="stat-name">Height:</span> {details.height / 10} m</p>
      <p><span class="stat-name">Weight:</span> {details.weight / 10} kg</p>

      {#each details.stats as stat}
        <p>
          <span class="stat-name">{stat.stat.name}:</span>
          <span class="stat-value">{stat.base_stat}</span>
        </p>
      {/each}
    </div>

    <div class="pokemon-abilities">
      <h3>Abilities</h3>
      {#each details.abilities as { ability }}
        <span class="ability-item">{ability.name}</span>
      {/each}
    </div>

    <div class="pokemon-details">
      <div class="info-item"><strong>ID:</strong> {details.id}</div>
      <div class="info-item">
        <strong>Species:</strong>
        {details.species.name}
      </div>
    </div>
  </div>
{/await}
<p>{pokemonId}</p>

<style>
  .pokemon-container {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
  }

  .pokemon-image {
    width: 300px; /* Większy obrazek */
    height: 300px; /* Większy obrazek */
    object-fit: contain;
    margin: 20px 0;
  }

  .pokemon-name {
    font-size: 2.5rem;
    font-weight: bold;
    text-transform: capitalize;
    margin-bottom: 10px;
  }

  .pokemon-types {
    margin-top: 10px;
  }

  .pokemon-types span {
    display: inline-block;
    background-color: #ffcc00;
    color: #fff;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    text-transform: capitalize;
  }

  .pokemon-description {
    font-style: italic;
    color: #555;
    margin-top: 10px;
  }

  .pokemon-stats,
  .pokemon-abilities {
    margin-top: 20px;
    font-size: 1.2rem;
  }

  .stat-name {
    font-weight: bold;
  }

  .ability-item {
    background-color: #76c7c0;
    color: white;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 5px;
    text-transform: capitalize;
  }

  .stat-value {
    font-weight: bold;
  }

  .pokemon-details {
    margin-top: 30px;
  }

  .info-item {
    margin-bottom: 10px;
  }
</style>
