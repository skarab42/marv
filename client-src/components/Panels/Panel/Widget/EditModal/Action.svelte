<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import Button from "@/components/UI/Button.svelte";
  import Select from "@/components/UI/Select.svelte";
  import widgets, { getWidgetsList } from "@/components/Widgets";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  export let panel;
  export let widget;

  const widgetsList = [{ key: "None", val: null }, ...getWidgetsList()];

  $: component = widget.component;
  $: componentName = (component && component.name) || "";

  function onComponentChange({ detail: name }) {
    widget.component = widgets[name].config;
    update(panel);
  }

  function onRemoveAction() {
    widget.component = null;
    update(panel);
  }
</script>

{#if component}
  <svelte:component this="{widgets[component.name].Settings}" />
  <Button icon="{MdDelete}" class="bg-red-600" on:click="{onRemoveAction}">
    {_('words.remove')}
  </Button>
{:else}
  <div class="p-2 space-y-2 flex flex-col">
    <Select
      object="{true}"
      label="{_('words.component')}"
      value="{componentName}"
      items="{widgetsList}"
      on:change="{onComponentChange}"
    />
  </div>
{/if}
