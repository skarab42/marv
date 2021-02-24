<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import ActionEvent from "./ActionEvent.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MdCode from "svelte-icons/md/MdCode.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import ConditionModal from "./ConditionBuilder/Modal.svelte";

  export let panel;
  export let widget;
  export let eventNames;

  let selectedEvent = null;
  let conditionModalOpened = false;

  function setShowAddButton(events) {
    if (!events.length) return true;
    const lastEvent = events[events.length - 1];
    const eventName = lastEvent && lastEvent.eventName;
    if (!eventName || eventName === "none") return false;
    if (eventName === "onCommand" && !lastEvent.commandName) {
      return false;
    }
    if (eventName === "onRedemption" && !lastEvent.rewardId) {
      return false;
    }
    if (eventName === "onShortcut" && !lastEvent.shortcutName) {
      return false;
    }
    return true;
  }

  $: showAddButton = setShowAddButton(widget.events);

  function onChange(index, { detail }) {
    widget.events[index][detail.key] = detail.value;
    update(panel);
  }

  function addEvent() {
    widget.events = [...widget.events, {}];
    update(panel);
  }

  function onRemove(index) {
    widget.events = widget.events.filter((item, id) => id !== index);
    update(panel);
  }

  function onEditCondition(event) {
    selectedEvent = event;
    conditionModalOpened = true;
  }
</script>

{#each widget.events as event, index}
  <div class="flex gap-2">
    <div class="flex-auto">
      <ActionEvent
        event="{event}"
        eventNames="{eventNames}"
        on:change="{onChange.bind(null, index)}"
      />
    </div>
    <Button
      icon="{MdCode}"
      class="bg-blue-600"
      on:click="{onEditCondition.bind(null, event)}"
    />
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

<ConditionModal event="{selectedEvent}" bind:opened="{conditionModalOpened}" />
