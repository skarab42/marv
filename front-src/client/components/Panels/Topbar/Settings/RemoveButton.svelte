<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import { currentPanel } from "@/stores/panels";
  import Button from "@/components/UI/Button.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";

  let confirmModal = false;

  let question = _("sentences.ask-for-panel-deletion", {
    name: $currentPanel.name,
  });

  function openConfirmModal() {
    confirmModal = true;
  }

  function closeConfirmModal() {
    confirmModal = false;
  }

  function removeCurrentPanel() {
    api.remove($currentPanel);
  }

  function onConfirm({ detail }) {
    detail && removeCurrentPanel();
    closeConfirmModal();
  }
</script>

<Button
  padding="p-2"
  icon="{MdDelete}"
  class="bg-red-600"
  on:click="{openConfirmModal}"
>
  <div class="hidden lg:inline">{_('words.remove')}</div>
</Button>

<ConfirmModal
  question="{question}"
  visible="{confirmModal}"
  on:confirm="{onConfirm}"
/>
