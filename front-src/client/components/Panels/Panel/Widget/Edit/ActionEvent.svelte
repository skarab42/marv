<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import capitalize from "capitalize";
  import { localeSort } from "@/libs/utils";
  import widgets from "@/components/Widgets";
  import ShortcutInput from "./ShortcutInput.svelte";
  import Select from "@/components/UI/Select.svelte";
  import Notify from "@/components/UI/Notify.svelte";
  import { commands, rewards } from "@/stores/twitch";
  import { update, registerShortcut, unregisterShortcut } from "@/libs/panels";

  export let panel;
  export let widget;

  let eventNames = [];
  let showInvalidShortcutMessage = false;

  const none = capitalize(_(`words.none`));
  const noneObject = { key: none, val: null };
  const rewardMap = (reward) => ({ val: reward.id, key: reward.title });

  $: commandNames = [none, ...$commands.map((cmd) => cmd.name)];
  $: rewardNames = $rewards
    ? [noneObject, ...$rewards.map(rewardMap)]
    : [noneObject];

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

  $: component = widget.component;
  $: componentName = (component && component.name) || "";
  $: config = componentName ? widgets[componentName].config : {};

  function onEventChange({ detail: eventName }) {
    onShortcutReset();
    widget.eventName = eventName;
    update(panel);
  }

  function onCommandChange({ detail: commandName }) {
    widget.commandName = commandName;
    update(panel);
  }

  async function onShortcutChange({ detail: shortcut }) {
    const { result } = await registerShortcut(shortcut.accelerator);
    widget.shortcutName = result ? shortcut.accelerator : "";
    showInvalidShortcutMessage = !result;
    update(panel);
  }

  function onShortcutReset() {
    widget.shortcutName = "";
    update(panel);
    unregisterShortcut();
  }

  function onRewardChange({ detail: rewardId }) {
    widget.rewardId = rewardId;
    update(panel);
  }

  function onInvalidMessageClose() {
    showInvalidShortcutMessage = false;
  }
</script>

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

{#if widget.eventName === 'onShortcut'}
  {#if showInvalidShortcutMessage}
    <Notify
      type="warn"
      message="{_('sentences.global-shortcut-reserved')}"
      on:close="{onInvalidMessageClose}"
    />
  {:else}
    <ShortcutInput
      value="{widget.shortcutName}"
      on:change="{onShortcutChange}"
      on:reset="{onShortcutReset}"
    />
  {/if}
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