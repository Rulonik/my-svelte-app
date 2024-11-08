<script>
  import { onMount } from "svelte";
  const endpoint = "https://api.chucknorris.io/jokes/"; // URL API
  let categories = [];
  let selectedCategory;
  let joke = { icon_url: "", value: "Loading..." }; // Domyślny żart
  // onMount – funkcja, która działa, gdy komponent zostaje zamontowany
  onMount(async () => {
    const response = await fetch(endpoint + "categories");
    const data = await response.json();
    categories = data;
    selectedCategory = categories[0]; // Ustawiamy domyślną kategorię
  });
  async function loadJoke(category) {
    const response = await fetch(endpoint + `random?category=${category}`);
    const data = await response.json();
    joke = data; // Przypisujemy nowy żart do zmiennej
  }
  // gdy zmienia się selectedCategory, ładujemy nowy żart
  $: selectedCategory, loadJoke(selectedCategory);
</script>

<select bind:value={selectedCategory} class="px-5">
  {#each categories as category}
    <option value={category}>{category}</option>
  {/each}
</select>
<img src={joke.icon_url} alt="Chuck Norris icon" class="w-12 h-12 mb-2 mr-2" />
<p class="text-center" style="color:white; text-shadow:2px 2px 12px red;">
  {joke.value}
</p>
