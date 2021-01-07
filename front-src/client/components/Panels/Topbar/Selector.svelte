<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import Button from "@/components/UI/Button.svelte";
  import HorizontalScroller from "@/components/UI/HorizontalScroller.svelte";

  import { panels, currentPanel, setCurrentPanel } from "@/stores/panels";

  let scroller = null;

  api.on("add", (panel, { owner }) => {
    owner && scroller && scroller.scrollRight();
  });

  function isActiveClass(p1, p2) {
    return p1.id === p2.id ? "bg-secondary" : "bg-black bg-opacity-25";
  }
</script>

{#if $panels.length}
  <div class="p-2 flex space-x-2 items-center bg-dark text-light">
    <HorizontalScroller bind:this="{scroller}" gap="2" arrowClass="bg-dark">
      {#each $panels as panel}
        <Button
          padding="p-2"
          on:click="{setCurrentPanel.bind(null, panel)}"
          class="flex-shrink-0 {isActiveClass($currentPanel, panel)} truncate"
        >
          {panel.name}
        </Button>
      {/each}
    </HorizontalScroller>
  </div>
{/if}
