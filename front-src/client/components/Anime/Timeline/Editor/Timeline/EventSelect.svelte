<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Select from "@/components/UI/Select.svelte";
  import { createEventDispatcher, getContext, onMount } from "svelte";

  const { fakeEvent } = getContext("Editor");

  export let widget;
  export let showLabel = true;

  let events = {};
  let eventName = null;
  let eventsNames = [];

  const dispatch = createEventDispatcher();

  function setEventName(name) {
    eventName = name;
    $fakeEvent = { eventName: `on${name}`, ...events[eventName] };
    dispatch("update", { events, eventName });
  }

  function updateEvents() {
    api.getEvents().then((names) => {
      widget.events.forEach((e) => {
        const result = names.find((event) => event.name === e.eventName);
        if (result) {
          const name = result.name.slice(2);
          eventsNames = [...eventsNames, name];
          events[name] = result.tags;
        }
      });
      setEventName(eventsNames[0]);
    });
  }

  function onEventChange({ detail }) {
    setEventName(detail);
  }

  onMount(() => updateEvents());
</script>

{#if eventsNames.length}
  <Select
    rootClass="flex-shrink-0"
    items="{eventsNames}"
    label="{showLabel && _('words.event')}"
    on:change="{onEventChange}"
  />
{/if}
