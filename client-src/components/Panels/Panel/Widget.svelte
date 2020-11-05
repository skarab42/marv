<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import { editMode } from "@/stores/panels";
  import RemoveCross from "./Widget/RemoveCross.svelte";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";

  export let item;
  export let panel;

  let confirmModal = false;

  $: widget = panel.widgets.find((i) => i.id === item.id);
  $: bgColor = `background-color: ${widget.backgroundColor};`;
  $: borders = widget.borders;

  $: question = _("sentences.ask-for-widget-deletion", {
    name: widget.label || widget.id,
  });

  function openConfirmModal() {
    confirmModal = true;
  }

  function closeConfirmModal() {
    confirmModal = false;
  }

  function removeWidget() {
    api.removeWidget(panel, widget);
  }

  function onConfirm({ detail }) {
    detail && removeWidget();
    closeConfirmModal();
  }
</script>

<div class="h-full {borders}" style="{bgColor}">
  {#if $editMode}
    <RemoveCross borders="{borders}" on:click="{openConfirmModal}" />
  {/if}
</div>

<ConfirmModal
  question="{question}"
  visible="{confirmModal}"
  on:confirm="{onConfirm}"
/>
