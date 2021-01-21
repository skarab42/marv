<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import addWidget from "./addWidget";
  import { setEditMode } from "@/stores/panels";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MenuItem from "@/components/UI/MenuItem.svelte";

  async function addPanel() {
    await api.add();
    await addWidget();
    setEditMode(true);
  }
</script>

<MenuItem icon="{MdAdd}" on:click="{addPanel}">
  {_('sentences.add-panel')}
</MenuItem>
