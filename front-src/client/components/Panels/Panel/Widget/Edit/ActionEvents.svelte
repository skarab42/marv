<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import ActionEvent from "./ActionEvent.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

  export let panel;
  export let widget;
  export let eventNames;

  function setShowAddButton(events) {
    if (!events.length) return true;
    const lastEvent = events[events.length - 1];
    return lastEvent && lastEvent.eventName && lastEvent.eventName !== "none";
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
