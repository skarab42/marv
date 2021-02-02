<script>
  import Modal from "@/components/UI/Modal.svelte";
  import EditStyles from "./Edit/Styles.svelte";
  import { _ } from "@/libs/i18next";

  export let opened = false;
</script>

<Modal on:mousedown bind:opened title="{_('sentences.edit-styles')}">
  <EditStyles {...$$restProps} />
</Modal>
