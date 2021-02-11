<script>
  import { _ } from "@/libs/i18next";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import FaFileImport from "svelte-icons/fa/FaFileImport.svelte";
</script>

<MenuItem icon="{FaFileImport}" on:click>{_('words.import')}</MenuItem>
