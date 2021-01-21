<script>
  import { _ } from "@/libs/i18next";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import { currentPanel, addWidget } from "@/stores/panels";
</script>

{#if $currentPanel}
  <MenuItem icon="{MdAdd}" on:click="{addWidget}">
    {_('sentences.add-grid-widget')}
  </MenuItem>
{/if}
