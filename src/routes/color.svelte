<script>
  let red = 0;
  let green = 0;
  let blue = 0;
  let format = "rgb";

  function rgbToHex(r, g, b) {
    const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  function calculateBrightness(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  $: colorDisplay =
    format === "rgb"
      ? `rgb(${red}, ${green}, ${blue})`
      : rgbToHex(red, green, blue);
  $: textColor =
    calculateBrightness(red, green, blue) < 128 ? "white" : "black";
</script>

<div class="flex h-48" style="width: 500px;">
  <div
    class="result w-2/3 flex justify-center items-center"
    style="background-color: rgb({red}, {green}, {blue}); color: {textColor}"
  >
    <p>{colorDisplay}</p>
  </div>
  <div class="picker w-1/3 flex flex-col text-white">
    <p class="text-white text-xl mx-2">Kolory:</p>
    <div class="picker mx-2">
      <label for="inp1">Red({red})</label>
      <input bind:value={red} type="range" id="inp1" min="0" max="250" />
    </div>
    <div class="picker mx-2">
      <label for="inp2">Green({green})</label>
      <input type="range" id="inp2" min="0" max="255" bind:value={green} />
    </div>
    <div class="picker mx-2">
      <label for="inp3">Blue({blue})</label>
      <input type="range" id="inp3" min="0" max="255" bind:value={blue} />
    </div>
    <p class="text-white text-xl mx-2">Format koloru:</p>
    <div class=" mx-2">
      <input type="radio" name="rad" value="rgb" bind:group={format} />
      <label for="rgb">RGB</label>
    </div>
    <div class="mx-2">
      <input type="radio" name="rad" value="hex" bind:group={format} />
      <label for="hex">HEX</label>
    </div>
  </div>
</div>
