<script>
  import app from "@/api/app";
  import { _ } from "@/libs/i18next";
  import Button from "@/components/UI/Button.svelte";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";

  let confirmModal = false;

  function quit() {
    confirmModal = true;
  }

  function onConfirm({ detail }) {
    detail && app.quit();
    confirmModal = false;
  }
</script>

<Button class="bg-red-600" on:click="{quit}">{_('words.quit')}</Button>
<ConfirmModal
  opened="{confirmModal}"
  on:confirm="{onConfirm}"
  question="{_('sentences.confirm-quit')}"
/>
