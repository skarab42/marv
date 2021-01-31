<script>
  import { _ } from "@/libs/i18next";
  import EditAction from "./Edit/Action.svelte";
  import EditStyles from "./Edit/Styles.svelte";
  import Modal from "@/components/UI/Modal.svelte";

  export let opened = false;
</script>

<Modal on:close opened="{opened}" title="{_('sentences.widget-settings')}">
  <div class="flex flex-col">
    <div class="p-2 tracking-widest text-2xl font-bold">Action</div>
    <EditAction {...$$restProps} />
    <div class="p-2 tracking-widest text-2xl font-bold">Styles</div>
    <EditStyles {...$$restProps} />
  </div>
</Modal>
