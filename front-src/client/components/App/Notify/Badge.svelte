<script>
  import { color } from "./colors";

  export let type;
  export let notices;
</script>

{#if notices.length}
  <div class="text-sm px-2 inline rounded-full {color(type)}">
    {notices.length}
  </div>
{/if}
