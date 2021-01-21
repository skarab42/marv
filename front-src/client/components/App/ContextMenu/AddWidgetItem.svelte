<script>
  import { _ } from "@/libs/i18next";
  import addWidget from "./addWidget";
  import { currentPanel } from "@/stores/panels";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MenuItem from "@/components/UI/MenuItem.svelte";
</script>

{#if $currentPanel}
  <MenuItem icon="{MdAdd}" on:click="{addWidget}">
    {_('sentences.add-grid-widget')}
  </MenuItem>
{/if}
