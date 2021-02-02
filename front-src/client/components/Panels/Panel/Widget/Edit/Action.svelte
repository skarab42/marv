<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import cloneDeep from "clone-deep";
  import capitalize from "capitalize";
  import { localeSort } from "@/libs/utils";
  import widgets from "@/components/Widgets";
  import Button from "@/components/UI/Button.svelte";
  import Select from "@/components/UI/Select.svelte";
  import { commands, rewards } from "@/stores/twitch";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";
  import { update, removeWidgetComponent } from "@/libs/panels";

  export let panel;
  export let widget;

  let eventNames = [];
  let removeActionModal = false;

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
    if (Array.isArray(config.hasEvent)) {
      names = config.hasEvent;
    } else {
      names = names.map((event) => event.name);
    }
    eventNames = names
      .map((val) => ({ key: _(`twitch.events.${val}`), val }))
      .sort((a, b) => localeSort(a.key, b.key));
    eventNames.unshift({ key: none, val: "none" });
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

  function onRemoveActionConfirmed({ detail: response }) {
    removeActionModal = false;
    response &&
      removeWidgetComponent(panel, widget)
        .then(() => {
          widget.component = null;
          update(panel);
        })
        .catch((error) => {
          console.log("ERRRO:", error);
        });
  }

  function onRemoveAction() {
    removeActionModal = true;
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
  <div class="mt-2 flex">
    <svelte:component this="{widgets[component.name].Settings}" data="{data}" />
  </div>
  <div class="p-2 pt-0 flex flex-col space-y-2">
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
  <div class="flex p-2 pt-0">
    <Button
      icon="{MdDelete}"
      class="flex-auto bg-red-600"
      on:click="{onRemoveAction}"
    >
      {_('words.remove')}
    </Button>
  </div>
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

<ConfirmModal
  question="{_('sentences.ask-remove-action', {
    action: component && _(component.label),
  })}"
  bind:opened="{removeActionModal}"
  on:confirm="{onRemoveActionConfirmed}"
/>
