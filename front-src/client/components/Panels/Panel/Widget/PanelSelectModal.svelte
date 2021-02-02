<script>
  import { currentPanel, panels } from "@/stores/panels";
  import Select from "@/components/UI/Select.svelte";
  import Button from "@/components/UI/Button.svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import { createEventDispatcher } from "svelte";
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

  function onMove() {
    const panel = $panels.find(({ id }) => id === panelId);
    dispatch("select", panel);
    close();
  }
</script>

<Modal on:mousedown bind:opened title="{_('sentences.move-widget-to')}">
  <div class="flex flex-col p-5 gap-5">
    <Select object="{true}" items="{_panels}" bind:value="{panelId}" />
    <div class="flex gap-5">
      <Button class="flex flex-auto bg-green-600" on:click="{onMove}">
        {_('words.move')}
      </Button>
      <Button class="flex flex-auto bg-gray-700" on:click="{close}">
        {_('words.cancel')}
      </Button>
    </div>
  </div>
</Modal>
