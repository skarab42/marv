<script>
  import { drawer, hide } from "@/stores/drawer";
  import clickoutside from "@/libs/svelte/click-outside";
  import LanguageSelect from "@/components/App/LanguageSelect.svelte";
</script>

{#if $drawer.visible}
  <div
    use:clickoutside
    on:clickoutside="{hide}"
    class="absolute z-50 top-0 right-0 bottom-0 flex flex-col bg-dark shadow"
  >
    <div class="p-2 bg-secondary">Drawer</div>
    <div class="p-2">Item...</div>
    <LanguageSelect class="p-2 text-dark" />
  </div>
{/if}
