<script>
  import { _ } from "@/libs/i18next";
  import Modal from "@/components/UI/Modal.svelte";

  export let visible = false;

  function onClose() {
    visible = false;
  }
</script>

{#if visible}
  <Modal closable on:close="{onClose}" class="bg-dark rounded">
    <div class="p-2 pr-10 font-bold bg-primary-darker rounded-t">
      {_('sentences.widget-settings')}
    </div>
    <div class="flex p-5 space-x-2">...</div>
  </Modal>
{/if}
