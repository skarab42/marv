<script>
  import Modal from "@/components/UI/Modal.svelte";
  import Builder from "./Builder.svelte";
  import capitalize from "capitalize";
  import { _ } from "@/libs/i18next";

  export let opened = false;
</script>

<Modal bind:opened title="{capitalize(_('words.conditions'))}">
  <Builder on:update {...$$restProps} />
</Modal>
