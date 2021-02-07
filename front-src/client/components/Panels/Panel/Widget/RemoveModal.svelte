<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";

  export let panel;
  export let widget;
  export let opened = false;

  $: question = _("sentences.ask-for-widget-deletion", {
    name: widget ? widget.label || widget.id : "undefined widget",
  });

  function closeConfirmModal() {
    opened = false;
  }

  function removeWidget() {
    api.removeWidget(panel, widget);
  }

  function onConfirm({ detail }) {
    detail && removeWidget();
    closeConfirmModal();
  }
</script>

<ConfirmModal
  on:mousedown
  bind:opened
  question="{question}"
  on:confirm="{onConfirm}"
/>
