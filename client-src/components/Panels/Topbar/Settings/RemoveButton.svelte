<script>
  import api from "@/libs/panels";
  import { _ } from "@/libs/i18next";
  import { currentPanel } from "@/stores/panels";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  let removeModal = false;

  function openRemoveModal() {
    removeModal = true;
  }

  function closeRemoveModal() {
    removeModal = false;
  }

  function removeCurrentPanel() {
    api.remove($currentPanel);
    closeRemoveModal();
  }
</script>

<Button
  icon="{MdDelete}"
  on:click="{openRemoveModal}"
  padding="p-2"
  class="bg-red-600"
>
  <div class="hidden lg:inline">{_('words.remove')}</div>
</Button>

{#if removeModal}
  <Modal class="bg-dark rounded">
    <div class="p-5 font-bold">
      {_('sentences.ask-for-panel-deletion', { name: $currentPanel.name })}
    </div>
    <div class="flex p-5 space-x-2">
      <Button class="bg-primary" on:click="{removeCurrentPanel}">
        {_('words.yes')}
      </Button>
      <Button class="bg-dark-darker" on:click="{closeRemoveModal}">
        {_('words.no')}
      </Button>
    </div>
  </Modal>
{/if}
