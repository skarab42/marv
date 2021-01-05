<script>
  import { _ } from "@/libs/i18next";
  import { store, changeLanguage } from "@/stores/i18next";

  import Modal from "@/components/UI/Modal.svelte";
  import Select from "@/components/UI/Select.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdLanguage from "svelte-icons/md/MdLanguage.svelte";

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

<div class="flex items-center">
  <div class="ml-2 w-6 h-6">
    <MdLanguage />
  </div>
  <div class="p-2 uppercase flex-auto">{_('words.language')}</div>
  <Select
    class="flex-auto"
    value="{$store.lng}"
    items="{$store.supportedLngs}"
    on:change="{onChange}"
  />
</div>

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
