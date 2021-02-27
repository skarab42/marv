<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import ActionEvent from "./ActionEvent.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdCode from "svelte-icons/md/MdCode.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import ConditionModal from "./ConditionBuilder/Modal.svelte";
  import { unregisterShortcut } from "@/libs/panels";

  export let panel;
  export let widget;
  export let eventNames;

  let selectedEvent = null;
  let selectedEventIndex = null;
  let conditionModalOpened = false;

  function isValidEvent(event) {
    const eventName = event && event.eventName;
    if (!eventName) return false;
    if (eventName === "onCommand" && !event.commandName) {
      return false;
    }
    if (eventName === "onRedemption" && !event.rewardId) {
      return false;
    }
    if (eventName === "onShortcut" && !event.shortcutName) {
      return false;
    }
    return true;
  }

  function setShowAddButton(events) {
    if (!events.length) return true;
    return isValidEvent(events[events.length - 1]);
  }

  $: showAddButton = setShowAddButton(widget.events);

  function onChange(index, { detail }) {
    widget.events[index][detail.key] = detail.value;
    update(panel);
  }

  function addEvent() {
    widget.events = [...widget.events, { eventName: null }];
    update(panel);
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

  function onSelectedEventUpdate({ detail }) {
    widget.events = widget.events.map((event, index) => {
      return index === selectedEventIndex ? detail : event;
    });
    update(panel);
  }
</script>

{#each widget.events as event, index}
  <div class="flex gap-2">
    <div class="flex flex-auto gap-2">
      <ActionEvent
        event="{event}"
        eventNames="{eventNames}"
        on:change="{onChange.bind(null, index)}"
      />
    </div>
    {#if event.eventName !== 'onShortcut'}
      <Button
        icon="{MdCode}"
        class="bg-blue-600"
        disabled="{!isValidEvent(event)}"
        on:click="{onEditCondition.bind(null, { index, event })}"
      />
    {/if}
    <Button
      icon="{MdClose}"
      class="bg-red-600"
      on:click="{onRemove.bind(null, index)}"
    />
  </div>
{/each}

{#if showAddButton}
  <Button icon="{MdAdd}" on:click="{addEvent}" class="bg-secondary">
    {_('sentences.add-event')}
  </Button>
{/if}

<ConditionModal
  event="{selectedEvent}"
  on:update="{onSelectedEventUpdate}"
  bind:opened="{conditionModalOpened}"
/>
