<script>
  import { _ } from "@/libs/i18next";
  import Main from "./Main.svelte";
  import Modal from "@/components/UI/Modal.svelte";

  export let accept;
</script>

<Modal on:close {...$$restProps} title="{_('sentences.file-manager')}">
  <Main accept="{accept}" on:select />
</Modal>
