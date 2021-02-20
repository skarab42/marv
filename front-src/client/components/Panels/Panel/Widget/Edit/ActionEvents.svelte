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

  $: hasEvent =
    (widget.events && widget.events.length) || widget.eventName !== "none";

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

{#if hasEvent}
  {#each widget.events as event, index}
    <div class="relative p-2 mt-5 flex gap-2 bg-gray-700">
      <div class="flex-auto flex flex-col gap-2">
        <ActionEvent
          event="{event}"
          eventNames="{eventNames}"
          on:change="{onChange.bind(null, index)}"
        />
      </div>
      <Button
        iconSize="sm"
        icon="{MdClose}"
        padding="p-1"
        style="top:-6px;right:-6px;"
        class="w-6 h-6 absolute bg-red-600 rounded-full"
        on:click="{onRemove.bind(null, index)}"
      />
    </div>
  {/each}
  <Button icon="{MdAdd}" on:click="{addEvent}" class="bg-secondary">
    {_('sentences.add-event')}
  </Button>
{/if}
