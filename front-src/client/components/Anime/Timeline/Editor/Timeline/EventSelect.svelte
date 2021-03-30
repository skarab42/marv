<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import { getContext, onMount } from "svelte";
  import Select from "@/components/UI/Select.svelte";

  const { fakeEvent, fakeEventName, events } = getContext("Editor");

  export let widget;
  export let showLabel = true;

  let eventsNames = [];

  function setEventName(name) {
    fakeEventName.set(name);
    fakeEvent.set({ eventName: `on${name}`, ...$events[$fakeEventName] });
  }

  function updateEvents() {
    api.getEvents().then((names) => {
      widget.events.forEach((e) => {
        const result = names.find((event) => event.name === e.eventName);
        if (result) {
          const name = result.name.slice(2);
          eventsNames = [...eventsNames, name];
          $events[name] = result.tags;
        }
      });
      !$fakeEventName && setEventName(eventsNames[0]);
    });
  }

  function onEventChange({ detail }) {
    setEventName(detail);
  }

  onMount(() => updateEvents());
</script>

{#if eventsNames.length}
  <Select
    value="{$fakeEventName}"
    items="{eventsNames}"
    rootClass="flex-shrink-0"
    on:change="{onEventChange}"
    label="{showLabel && _('words.event')}"
  />
{/if}
