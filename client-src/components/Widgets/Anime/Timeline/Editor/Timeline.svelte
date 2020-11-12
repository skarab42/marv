<script>
  import { getContext } from "svelte";
  import Grid from "./Timeline/Grid.svelte";
  import Player from "./Timeline/Player.svelte";
  import Cursor from "./Timeline/Cursor.svelte";
  import Item from "./Timeline/Item.svelte";

  const { anime, items } = getContext("Editor");

  let splitter = { x: 200, width: 4, min: 100, max: 500 };
</script>

<Grid bind:splitter>
  <div slot="header" class="p-2 flex splace-x-2 bg-primary-dark">
    <Player anime={$anime} />
  </div>
  <div slot="header" class="p-2 truncate bg-primary-dark">
    Timeline...
  </div>
  {#each $items as item, pos (item.id)}
    <Item bind:item {pos} />
  {/each}
  <Cursor min={splitter.x} />
</Grid>
