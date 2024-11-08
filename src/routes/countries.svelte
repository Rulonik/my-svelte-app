<script>
  import countries from "./../js/countries.json";

  let selected = "PL";
</script>

<img
  src="https://flagcdn.com/{selected.toLocaleLowerCase()}.svg"
  style="width: 300px; height:200px; margin:200px;"
  class="border-2 border-black w -[300px] h - [150px] object-cover"
/>

<select bind:value={selected}>
  {#each countries as country}
    <option value={country.code}>{country.name}</option>
  {/each}
</select>
