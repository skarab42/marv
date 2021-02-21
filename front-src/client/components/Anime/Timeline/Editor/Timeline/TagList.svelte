<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import { getContext } from "svelte";
  import EventSelect from "./EventSelect.svelte";
  import Input from "@/components/UI/Input.svelte";

  const { fakeEvent } = getContext("Editor");

  export let widget;

  let events = {};
  let eventName = null;

  let tagValue = "";
  let selectedTag = "";
  let showTagInput = false;

  function onEventUpdate({ detail }) {
    showTagInput = false;
    events = detail.events;
    eventName = detail.eventName;
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
      const el = document.getElementById("tag-input");
      el && el.focus();
    }, 42);
  }

  function onTagChange({ target }) {
    events[eventName][selectedTag] = target.value;
    $fakeEvent = { eventName: `on${eventName}`, ...events[eventName] };
    api.setEvent({ name: `on${eventName}`, tags: events[eventName] });
  }
</script>

<EventSelect widget="{widget}" on:update="{onEventUpdate}" />

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
