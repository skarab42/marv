<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import widgets from "@/components/Widgets";
  import Button from "@/components/UI/Button.svelte";
  import Select from "@/components/UI/Select.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  export let panel;
  export let widget;

  const triggerTypes = ["immediat", "queue", "asap"];

  const widgetsList = [
    { key: _("words.none"), val: null },
    ...getWidgetsList(),
  ];

  $: component = widget.component;
  $: componentName = (component && component.name) || "";

  export function getWidgetsList() {
    return Object.entries(widgets).map(([val, props]) => {
      return { key: _(props.config.label), val };
    });
  }

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
  <div class="p-2 font-bold bg-dark-lighter">{_(component.label)}</div>
  <div class="p-2">
    <Select
      label="{_('words.trigger')}"
      bind:value="{widget.trigger}"
      items="{triggerTypes}"
    />
  </div>
  <svelte:component
    this="{widgets[component.name].Settings}"
    panel="{panel}"
    widget="{widget}"
  />
  <Button icon="{MdDelete}" class="bg-red-600" on:click="{onRemoveAction}">
    <div>{_('words.remove')}</div>
  </Button>
{:else}
  <div class="p-2">
    <Select
      object="{true}"
      label="{_('words.component')}"
      value="{componentName}"
      items="{widgetsList}"
      on:change="{onComponentChange}"
    />
  </div>
{/if}
