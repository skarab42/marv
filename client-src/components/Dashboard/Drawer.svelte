<script>
  import clickoutside from "@/libs/svelte/click-outside";
  import { drawer, hide } from "@/stores/dashboard/drawer";
</script>

{#if $drawer.visible}
  <div
    use:clickoutside
    on:clickoutside="{hide}"
    class="absolute top-0 right-0 bottom-0 bg-dark"
  >
    <div class="p-2 bg-secondary">Drawer</div>
    <div class="p-2">Item...</div>
  </div>
{/if}
