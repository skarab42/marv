<script>
  import { _ } from "@/libs/i18next";
  import { panels } from "@/stores/panels";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import FaFileImport from "svelte-icons/fa/FaFileImport.svelte";
</script>

{#if $panels.length}
  <MenuItem icon="{FaFileImport}" on:click>{_('words.import')}</MenuItem>
{/if}
