<script>
  import api from "@/api/twitch";
  import { getContext } from "svelte";
  import Select from "./Select.svelte";
  import EventSelect from "./EventSelect.svelte";
  import Switch from "@/components/UI/Switch.svelte";

  export let widget;

  let eventTag = "";
  let eventTags = {};
  let eventKeys = [];
  let eventTagValue = null;

  $: if ($fakeEventName) onEventUpdate();
  $: isBool = eventTag.match(/^is[A-Z]/);

  const { fakeEvent, fakeEventName, events } = getContext("Editor");

  function onEventUpdate() {
    eventTags = $events[$fakeEventName];
    eventKeys = Object.keys(eventTags);
    eventTag = eventKeys[0];
  }

  function updateTag() {
    eventTags[eventTag] = eventTagValue;
    api.setEvent({ name: `on${$fakeEventName}`, tags: eventTags });
    fakeEvent.set({ eventName: `on${$fakeEventName}`, ...eventTags });
  }

  function onTagChange({ target }) {
    eventTag = target.value;
    eventTagValue = eventTags[eventTag];
  }

  function onTagValueChange({ target }) {
    eventTagValue = target.value;
    updateTag();
  }

  function onSwitchChange({ detail }) {
    eventTagValue = detail;
    updateTag();
  }
</script>

<EventSelect widget="{widget}" />

<div class="flex p-5 pb-0 gap-2 items-center">
  <Select value="{eventTag}" values="{eventKeys}" on:change="{onTagChange}" />
  {#if isBool}
    <Switch enabled="{eventTagValue}" on:change="{onSwitchChange}" />
  {:else}
    <input
      class="flex-auto text-dark p-2"
      value="{eventTagValue}"
      on:change="{onTagValueChange}"
    />
  {/if}
</div>
