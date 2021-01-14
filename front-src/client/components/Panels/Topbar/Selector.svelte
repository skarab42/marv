<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import Button from "./Button.svelte";
  import HorizontalScroller from "@/components/UI/HorizontalScroller.svelte";

  import { panels } from "@/stores/panels";

  let scroller = null;

  api.on("add", (panel, { owner }) => {
    owner && scroller && scroller.scrollRight();
  });

  function onMove({ detail }) {
    const { from, to } = detail;
    if (from === to) return;
    $panels.splice(to, 0, $panels.splice(from, 1)[0]);
    $panels = $panels;
  }
</script>

{#if $panels.length}
  <div class="p-2 flex space-x-2 panels-center bg-dark text-light">
    <HorizontalScroller bind:this="{scroller}" gap="2" arrowClass="bg-dark">
      {#each $panels as panel, index (panel.id)}
        <Button index="{index}" panel="{panel}" on:move="{onMove}" />
      {/each}
    </HorizontalScroller>
  </div>
{/if}
