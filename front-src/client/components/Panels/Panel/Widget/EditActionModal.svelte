<script>
  import Modal from "@/components/UI/Modal.svelte";
  import EditAction from "./Edit/Action.svelte";
  import { _ } from "@/libs/i18next";

  export let opened = false;
</script>

<Modal on:mousedown bind:opened title="{_('sentences.edit-action')}">
  <EditAction {...$$restProps} />
</Modal>
