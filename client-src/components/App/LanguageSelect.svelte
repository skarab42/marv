<script>
  import { _ } from "@/libs/i18next";
  import { store, changeLanguage } from "@/stores/i18next";

  import Modal from "@/components/UI/Modal.svelte";
  import Select from "@/components/UI/Select.svelte";
  import Button from "@/components/UI/Button.svelte";

  let modal = false;

  const openModal = () => (modal = true);
  const closeModal = () => (modal = false);

  function reload() {
    closeModal();
    location.reload();
  }

  async function onChange({ detail }) {
    await changeLanguage(detail);
    openModal();
  }
</script>

<Select
  value="{$store.lng}"
  items="{$store.supportedLngs}"
  on:change="{onChange}"
/>

{#if modal}
  <Modal class="bg-dark rounded">
    <div class="p-5 font-bold">{_('sentences.ask-for-client-reload')}</div>
    <div class="flex p-5 space-x-2">
      <Button class="bg-primary" on:click="{reload}">{_('words.yes')}</Button>
      <Button class="bg-dark-darker" on:click="{closeModal}">
        {_('words.no')}
      </Button>
    </div>
  </Modal>
{/if}
