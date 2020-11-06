<script>
  import { _ } from "@/libs/i18next";
  import Modal from "@/components/UI/Modal.svelte";
</script>

<Modal closable on:close class="bg-dark rounded">
  <div class="flex flex-col">
    <div class="p-2 pr-10 font-bold bg-primary-darker rounded-t">
      {_('sentences.widget-settings')}
    </div>
    <div class="p-2">...</div>
  </div>
</Modal>
