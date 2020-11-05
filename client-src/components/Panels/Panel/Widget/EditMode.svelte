<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import EditModal from "./EditModal.svelte";
  import RemoveCross from "./RemoveCross.svelte";
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
</script>

<div class="absolute inset-0" on:dblclick="{openEditModal}"></div>
<RemoveCross borders="{widget.borders}" on:click="{openConfirmModal}" />
<ConfirmModal
  question="{question}"
  visible="{confirmModal}"
  on:confirm="{onConfirm}"
/>
<EditModal visible="{editModal}" />
