<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import isValidEvent from "./isValidEvent";
  import Button from "@/components/UI/Button.svelte";
  import MdCode from "svelte-icons/md/MdCode.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import ActionEventSelect from "./ActionEventSelect.svelte";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";
  import { registerShortcut, unregisterShortcut } from "@/libs/panels";
  import ConditionModal from "@/components/ConditionBuilder/Modal.svelte";
  import MdSettingsEthernet from "svelte-icons/md/MdSettingsEthernet.svelte";

  export let panel;
  export let widget;
  export let event;
  export let index;
  export let eventNames;

  let selectedEvent = null;
  let selectedEventIndex = null;
  let removeConfirmModal = false;
  let conditionModalOpened = false;
  let showInvalidShortcutMessage = false;

  function change(key, value) {
    widget.events[index][key] = value;
    update(panel);
  }

  async function onShortcutChange(shortcut) {
    const { result } = await registerShortcut(shortcut.accelerator);
    const shortcutName = result ? shortcut.accelerator : "";
    showInvalidShortcutMessage = !result;
    change("shortcutName", shortcutName);
  }

  async function onShortcutReset() {
    await unregisterShortcut();
    change("shortcutName", null);
  }

  async function onChange({ detail }) {
    console.log(detail);

    if (detail.key === "shortcutName") {
      await onShortcutChange(detail.value);
      return;
    }

    change(detail.key, detail.value);
  }

  async function onRemove(index) {
    widget.events = widget.events.filter((item, id) => id !== index);
    await unregisterShortcut();
    update(panel);
  }

  function onEditCondition({ index, event }) {
    selectedEvent = event;
    selectedEventIndex = index;
    conditionModalOpened = true;
  }

  function onConfirmRemove({ detail: confirm }) {
    confirm && onRemove(index);
    removeConfirmModal = false;
  }

  function onSelectedEventUpdate({ detail }) {
    widget.events = widget.events.map((event, index) => {
      return index === selectedEventIndex ? detail : event;
    });
    update(panel);
  }

  function openConfirmRemoveModal() {
    removeConfirmModal = true;
  }
</script>

<div class="flex gap-2">
  <div class="flex flex-auto gap-2">
    <ActionEventSelect
      event="{event}"
      eventNames="{eventNames}"
      on:change="{onChange}"
      on:shortcutReset="{onShortcutReset}"
      bind:showInvalidShortcutMessage
    />
  </div>
  {#if event.eventName !== 'onShortcut'}
    <Button
      icon="{event.rules && event.rules.length ? MdSettingsEthernet : MdCode}"
      disabled="{!isValidEvent(event)}"
      on:click="{onEditCondition.bind(null, { index, event })}"
      class="bg-blue-600"
    />
  {/if}
  <Button
    icon="{MdClose}"
    class="bg-red-600"
    on:click="{openConfirmRemoveModal}"
  />
</div>

<ConfirmModal
  question="{_('sentences.ask-remove-action', {
    action: _(`twitch.events.${event.eventName}`),
  })}"
  bind:opened="{removeConfirmModal}"
  on:confirm="{onConfirmRemove}"
/>

<ConditionModal
  event="{selectedEvent}"
  on:update="{onSelectedEventUpdate}"
  bind:opened="{conditionModalOpened}"
/>
