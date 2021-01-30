<script>
  import { currentPanel, panels } from "@/stores/panels";
  import Select from "@/components/UI/Select.svelte";
  import Button from "@/components/UI/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import Modal from "../../Modal.svelte";
  import { _ } from "@/libs/i18next";

  export let opened = false;

  const dispatch = createEventDispatcher();

  let panelId;
  let _panels;

  function init() {
    _panels = $panels
      .filter(({ id }) => id !== $currentPanel.id)
      .map(({ id, name }) => ({ key: name, val: id }));

    panelId = _panels.length && _panels[0].val;
  }

  $: if ($currentPanel) init();

  function close() {
    opened = false;
  }

  function onCancel() {
    close();
  }

  function onMove() {
    const panel = $panels.find(({ id }) => id === panelId);
    dispatch("select", panel);
    close();
  }
</script>

{#if opened}
  <Modal
    title="{_('sentences.move-widget-to')}"
    closable="{true}"
    on:close="{close}"
  >
    <div class="flex flex-col gap-2">
      <Select object="{true}" items="{_panels}" bind:value="{panelId}" />
      <div class="flex gap-2">
        <Button class="flex bg-green-600" on:click="{onMove}">
          {_('words.move')}
        </Button>
        <Button class="flex bg-gray-700" on:click="{onCancel}">
          {_('words.cancel')}
        </Button>
      </div>
    </div>
  </Modal>
{/if}
