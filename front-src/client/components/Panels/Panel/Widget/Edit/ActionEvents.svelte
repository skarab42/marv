<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import isValidEvent from "./isValidEvent";
  import ActionEvent from "./ActionEvent.svelte";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import Button from "@/components/UI/Button.svelte";

  export let panel;
  export let widget;
  export let eventNames;

  function setShowAddButton(events) {
    if (!events.length) return true;
    return isValidEvent(events[events.length - 1]);
  }

  $: showAddButton = setShowAddButton(widget.events);

  function addEvent() {
    widget.events = [...widget.events, { eventName: null }];
    update(panel);
  }
</script>

{#each widget.events as event, index}
  <ActionEvent
    panel="{panel}"
    widget="{widget}"
    index="{index}"
    event="{event}"
    eventNames="{eventNames}"
  />
{/each}

{#if showAddButton}
  <Button icon="{MdAdd}" on:click="{addEvent}" class="bg-secondary">
    {_('sentences.add-event')}
  </Button>
{/if}
