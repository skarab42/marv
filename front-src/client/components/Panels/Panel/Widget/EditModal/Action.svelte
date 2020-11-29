<script>
  import api from "@/api/twitch";
  import cloneDeep from "clone-deep";
  import { _ } from "@/libs/i18next";
  import widgets from "@/components/Widgets";
  import Button from "@/components/UI/Button.svelte";
  import Select from "@/components/UI/Select.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import { update, removeWidgetComponent } from "@/libs/panels";

  export let panel;
  export let widget;

  let eventNames = ["none"];
  const triggerTypes = ["immediat", "queue", "asap"];

  api.getEventsNames().then((names) => {
    eventNames = [...eventNames, ...names];
  });

  const widgetsList = [
    { key: _("words.none"), val: null },
    ...getWidgetsList(),
  ];

  $: data = { panel, widget };
  $: component = widget.component;
  $: componentName = (component && component.name) || "";

  export function getWidgetsList() {
    return Object.entries(widgets).map(([val, props]) => {
      return { key: _(props.config.label), val };
    });
  }

  function onComponentChange({ detail: name }) {
    widget.component = cloneDeep(widgets[name].config);
    update(panel);
  }

  function onRemoveAction() {
    removeWidgetComponent(panel, widget)
      .then(() => {
        widget.component = null;
      })
      .catch((error) => {
        console.log("ERRRO:", error);
      });
  }

  function onEventChange({ detail: eventName }) {
    widget.eventName = eventName;
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
  <div class="p-2">
    <Select
      items="{eventNames}"
      value="{widget.eventName}"
      label="{_('words.event')}"
      on:change="{onEventChange}"
    />
  </div>
  <svelte:component this="{widgets[component.name].Settings}" data="{data}" />
  <Button icon="{MdDelete}" class="bg-red-600" on:click="{onRemoveAction}">
    <div>{_('words.remove')}</div>
  </Button>
{:else}
  <div class="p-2">
    <Select
      object="{true}"
      items="{widgetsList}"
      value="{componentName}"
      label="{_('words.component')}"
      on:change="{onComponentChange}"
    />
  </div>
{/if}
