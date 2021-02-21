<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import { getContext, onMount } from "svelte";
  import Input from "@/components/UI/Input.svelte";
  import Select from "@/components/UI/Select.svelte";

  const { fakeEvent } = getContext("Editor");

  export let widget;

  let events = {};
  let eventName = null;
  let eventsNames = [];

  let tagValue = "";
  let tagInput = null;
  let selectedTag = "";
  let showTagInput = false;

  function setEventName(name) {
    eventName = name;
    $fakeEvent = { eventName: `on${name}`, ...events[eventName] };
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
    showTagInput = false;
  }

  function onEditTag(tag) {
    if (selectedTag === tag) {
      showTagInput = !showTagInput;
    } else {
      showTagInput = true;
    }
    selectedTag = tag;
    tagValue = events[eventName][tag];
    setTimeout(() => {
      document.getElementById("tag-input").focus();
    }, 42);
  }

  function onTagChange({ target }) {
    events[eventName][selectedTag] = target.value;
    $fakeEvent = { eventName: `on${eventName}`, ...events[eventName] };
    api.setEvent({ name: `on${eventName}`, tags: events[eventName] });
  }

  onMount(() => updateEvents());
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
    {#each Object.keys(events[eventName]) as tag}
      <div
        on:click="{onEditTag.bind(null, tag)}"
        class="px-2 bg-gray-900 rounded cursor-pointer text-sm"
      >
        {tag}
      </div>
    {/each}
  </div>
{/if}

{#if showTagInput}
  <div class="mx-3 p-2">
    <Input id="tag-input" value="{tagValue}" on:change="{onTagChange}" />
  </div>
{/if}
