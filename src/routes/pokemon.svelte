<script>
  import { loadPokemons } from "../stores/pokestores";

  let variantsNumber = 4;
  let questionsNumber = 4;
  let currentQuestion = 0;
  let score = 0;

  let pokemonAnswers = [];
  let pokemonQuestions = [];
  let maxPokemonNumer = 0;
  let selectedAnswer = null;
  let correctAnswer = null;

  function generateQuiz() {
    let pokemons = $loadPokemons;
    maxPokemonNumer = pokemons.length;

    for (let i = 0; i < questionsNumber; i++) {
      const pokemon = pokemons[Math.floor(Math.random() * maxPokemonNumer)];
      pokemonQuestions.push(pokemon);

      let answers = [pokemon.name];

      while (answers.length < variantsNumber) {
        const randomPokemon =
          pokemons[Math.floor(Math.random() * maxPokemonNumer)];
        if (
          !answers.includes(randomPokemon.name) &&
          randomPokemon !== pokemon
        ) {
          answers.push(randomPokemon.name);
        }
      }

      answers.sort(() => Math.random() - 0.5);
      pokemonAnswers.push(answers);
    }

    return pokemonQuestions;
  }

  let readyPokemons = generateQuiz();

  function checkAnswer(answer) {
    selectedAnswer = answer;
    correctAnswer = pokemonQuestions[currentQuestion].name;

    if (answer === correctAnswer) {
      score++;
    }

    setTimeout(() => {
      selectedAnswer = null;
      currentQuestion++;
    }, 1500);
  }
</script>

<div
  class="container flex flex-grow justify-center m-auto flex-col items-center"
>
  {#if currentQuestion === questionsNumber}
    <p style="color: white;">
      Koniec quizu! Twój wynik: {score}/{questionsNumber}
    </p>
  {:else}
    {#each readyPokemons as pokemon, i}
      {#if currentQuestion === i}
        <div class="container flex flex-col items-center m-2">
          <img src={pokemon.img} alt={pokemon.name} class="w-32 h-32" />
        </div>
        <div class="flex flex-row justify-center items-center m-2">
          {#each pokemonAnswers[currentQuestion] as answer}
            <button
              on:click={() => checkAnswer(answer)}
              class="m-1 p-2 text-white rounded
                {selectedAnswer
                ? answer === correctAnswer
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : 'bg-blue-500'}"
              disabled={selectedAnswer}
            >
              {answer}
            </button>
          {/each}
        </div>
      {/if}
    {/each}
  {/if}
</div>
