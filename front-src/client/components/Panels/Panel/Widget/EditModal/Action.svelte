<script>
  import api from "@/api/twitch";
  import cloneDeep from "clone-deep";
  import { _ } from "@/libs/i18next";
  import capitalize from "capitalize";
  import { commands, rewards } from "@/stores/twitch";
  import widgets from "@/components/Widgets";
  import Button from "@/components/UI/Button.svelte";
  import Select from "@/components/UI/Select.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import { update, removeWidgetComponent } from "@/libs/panels";

  export let panel;
  export let widget;

  let eventNames = [];

  const none = capitalize(_(`words.none`));

  const noneObject = { key: none, val: null };
  const rewardMap = (reward) => ({ val: reward.id, key: reward.title });
  const widgetsList = [noneObject, ...getWidgetsList()];

  $: commandNames = [none, ...$commands.map((cmd) => cmd.name)];
  $: rewardNames = $rewards
    ? [noneObject, ...$rewards.map(rewardMap)]
    : [noneObject];

  const triggerTypes = ["immediat", "queue", "asap"].map((val) => {
    return { val, key: capitalize(_(`words.${val}`)) };
  });

  api.getEventNames().then((names) => {
    eventNames = ["none", ...names].map((val) => {
      return { key: _(`twitch.events.${val}`), val };
    });
  });

  $: data = { panel, widget };
  $: component = widget.component;
  $: componentName = (component && component.name) || "";
  $: config = componentName ? widgets[componentName].config : {};

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
        update(panel);
      })
      .catch((error) => {
        console.log("ERRRO:", error);
      });
  }

  function onEventChange({ detail: eventName }) {
    widget.eventName = eventName;
    update(panel);
  }

  function onCommandChange({ detail: commandName }) {
    widget.commandName = commandName;
    update(panel);
  }

  function onRewardChange({ detail: rewardId }) {
    widget.rewardId = rewardId;
    update(panel);
  }
</script>

{#if component}
  <div class="p-2 font-bold bg-dark-lighter">{_(component.label)}</div>
  <div class="p-2 flex flex-col space-y-2">
    {#if config.hasTrigger}
      <Select
        object="{true}"
        label="{_('words.trigger')}"
        bind:value="{widget.trigger}"
        items="{triggerTypes}"
      />
    {/if}
    {#if config.hasEvent}
      <Select
        object="{true}"
        items="{eventNames}"
        value="{widget.eventName}"
        label="{_('words.event')}"
        on:change="{onEventChange}"
      />
      {#if widget.eventName === 'onCommand'}
        <Select
          value="{widget.commandName}"
          items="{commandNames}"
          label="{_('words.command')}"
          on:change="{onCommandChange}"
        />
      {/if}
      {#if widget.eventName === 'onRedemption'}
        <Select
          object="{true}"
          items="{rewardNames}"
          value="{widget.rewardId}"
          label="{_('words.reward')}"
          on:change="{onRewardChange}"
        />
      {/if}
    {/if}
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
