<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";

  export let opened = false;
  export let panel = false;

  $: question = _("sentences.ask-for-panel-deletion", {
    name: panel ? panel.name : "undefined-panel-name",
  });

  function removePanel() {
    api.remove(panel);
  }

  function closeModal() {
    opened = false;
  }

  function onConfirm({ detail }) {
    detail && removePanel();
    closeModal();
  }
</script>

<ConfirmModal
  question="{question}"
  visible="{opened}"
  on:confirm="{onConfirm}"
/>
