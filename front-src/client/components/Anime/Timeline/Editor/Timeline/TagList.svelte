<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import { getContext } from "svelte";
  import Select from "./Select.svelte";
  import EventSelect from "./EventSelect.svelte";
  import Switch from "@/components/UI/Switch.svelte";

  export let widget;

  let eventTag = "";
  let eventName = "";
  let eventTags = {};
  let eventKeys = [];
  let eventTagValue = null;

  $: isBool = eventTag.match(/^is[A-Z]/);

  const { fakeEvent } = getContext("Editor");

  function onEventUpdate({ detail }) {
    eventName = detail.eventName;
    eventTags = detail.events[eventName];
    eventKeys = Object.keys(eventTags);
    eventTag = eventKeys[0];
  }

  function updateTag() {
    eventTags[eventTag] = eventTagValue;
    api.setEvent({ name: `on${eventName}`, tags: eventTags });
    $fakeEvent = { eventName: `on${eventName}`, ...eventTags };
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

<EventSelect widget="{widget}" on:update="{onEventUpdate}" />

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
