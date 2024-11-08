<script>
  import Router from "svelte-spa-router";

  // components
  import Header from "./component/header.svelte";
  import Footer from "./component/footer.svelte";

  // pages
  import Home from "./routes/Home.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Countries from "./routes/countries.svelte";
  import Color from "./routes/color.svelte";
  import Chuck from "./routes/chuck.svelte";
  import Book from "./routes/book.svelte";
  import Pok from "./routes/pokemon.svelte";
  import Pokemon from "./routes/pokemon.svelte";
  import Pokis from "./routes/pokis.svelte";
  import Id from "./routes/[id].svelte";

  const routes = {
    "/": Home,
    "/Pok": Pokemon,
    "/countries": Countries,
    "/color": Color,
    "/chuck": Chuck,
    "/book": Book,
    "/pokemons": Pokis,
    "/pokemon/:id": Id, // Dynamiczna trasa
    "*": NotFound, // Strona 404
  };
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex flex-1 items-center justify-center bg-gray-700">
    <Router {routes} />
  </main>
  <Footer />
</div>

<style>
  main {
    padding: 2rem;
  }
</style>
