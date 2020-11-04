<script>
  import api from "@/libs/panels";
  import { panels } from "@/stores/panels";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import Button from "@/components/UI/Button.svelte";

  function addPanel() {
    api.add();
  }

  $: console.log("$panels:", $panels);
</script>

<div class="p-2 flex space-x-2 items-center bg-dark text-light">
  <Button
    icon="{MdAdd}"
    padding="{null}"
    on:click="{addPanel}"
    class="bg-primary"
  />
</div>
