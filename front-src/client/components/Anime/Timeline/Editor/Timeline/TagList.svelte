<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import { getContext } from "svelte";
  import Select from "@/components/UI/Select.svelte";

  const { fakeEvent } = getContext("Editor");

  export let widget;

  let events = {};
  let eventName = null;
  let eventsNames = [];

  function setEventName(name) {
    eventName = name;
    const data = {};
    events[eventName].forEach((e) => (data[e] = e));
    $fakeEvent = { eventName: `on${name}`, ...data };
  }

  api.getEventNames().then((names) => {
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

  function onEventChange({ detail }) {
    setEventName(detail);
  }
</script>

{#if eventsNames.length}
  <Select
    items="{eventsNames}"
    label="{_('words.event')}"
    on:change="{onEventChange}"
  />
{/if}

{#if eventName}
  <div class="pt-5 px-5 flex gap-2">
    {#each events[eventName] as tag}
      <div class="px-2 bg-gray-900 rounded cursor-pointer text-sm">{tag}</div>
    {/each}
  </div>
{/if}
