<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import EditModal from "./EditModal.svelte";
  import RemoveCross from "./RemoveCross.svelte";
  import doubletap from "@/libs/svelte/double-tap";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";

  export let panel;
  export let widget;

  let editModal = false;
  let confirmModal = false;

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

  function openEditModal() {
    editModal = true;
  }

  function closeEditModal() {
    editModal = false;
  }
</script>

<div
  use:doubletap
  class="absolute inset-0"
  on:dbltap="{openEditModal}"
  on:dblclick="{openEditModal}"
></div>

<RemoveCross borders="{widget.borders}" on:click="{openConfirmModal}" />

<ConfirmModal
  question="{question}"
  visible="{confirmModal}"
  on:confirm="{onConfirm}"
/>

{#if editModal}
  <EditModal panel="{panel}" widget="{widget}" on:close="{closeEditModal}" />
{/if}
