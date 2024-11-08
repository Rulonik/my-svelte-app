<script lang="ts">
  const subjects: Array<String> = [
    "Arts",
    "Animals",
    "Fiction",
    "Science & Mathematics",
    "Business & Finance",
    "Children's",
    "History",
    "Health & Wellness",
    "Biography",
    "Social Sciences",
    "Places",
    "Textbooks",
    "Books by Language",
  ];

  let current = "arts";
  let endpoint = "https://openlibrary.org/subjects/";
  let data = { works: [] };
  loadBooks(current);

  async function loadBooks(subject: String): Promise<any> {
    subject = subject
      .replace(" & ", "")
      .replace("'s", "")
      .replaceAll(" ", "")
      .toLowerCase();

    const response = await fetch(endpoint + `${subject}.json`);
    data = await response.json();
  }

  $: current, loadBooks(current);
</script>

<select bind:value={current} class="px-5">
  {#each subjects as subject}
    <option value={subject}>{subject}</option>
  {/each}
</select>

{#each data.works as work}
  <p style="color:red;display:flex;">{work.title}</p>
{/each}
<!-- <p>{data.works}</p> -->
