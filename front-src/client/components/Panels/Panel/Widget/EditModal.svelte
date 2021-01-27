<script>
  import { _ } from "@/libs/i18next";
  import Action from "./EditModal/Action.svelte";
  import Styles from "./EditModal/Styles.svelte";
  import Modal, { scrollTop } from "@/components/UI/Modal.svelte";
</script>

<Modal closable on:close class="bg-dark rounded">
  <div class="flex flex-col">
    <div class="p-2 pr-10 font-bold bg-primary-darker rounded-t">
      {_('sentences.widget-settings')}
    </div>
    <div class="p-2 tracking-widest text-2xl font-bold">Action</div>
    <Action {...$$restProps} />
    <div class="p-2 tracking-widest text-2xl font-bold">Styles</div>
    <Styles {...$$restProps} on:fileManagerOpen="{scrollTop}" />
  </div>
</Modal>
