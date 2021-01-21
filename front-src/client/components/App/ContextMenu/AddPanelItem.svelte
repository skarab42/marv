<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MenuItem from "@/components/UI/MenuItem.svelte";

  function addPanel() {
    api.add();
  }
</script>

<MenuItem icon="{MdAdd}" on:click="{addPanel}">
  {_('sentences.add-panel')}
</MenuItem>
