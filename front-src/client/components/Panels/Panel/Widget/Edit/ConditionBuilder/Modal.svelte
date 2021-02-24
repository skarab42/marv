<script>
  import Modal from "@/components/UI/Modal.svelte";
  import Builder from "./Builder.svelte";
  import { _ } from "@/libs/i18next";

  export let opened = false;
</script>

<Modal bind:opened title="{_('words.conditions')}">
  <Builder {...$$restProps} />
</Modal>
