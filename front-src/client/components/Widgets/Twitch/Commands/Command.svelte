<script>
  import api from "@/api/twitch";
  import EditCommand from "./EditCommand.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import Switch from "@/components/UI/Switch.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let prefix;
  export let command;

  let showEditModal = false;

  function removeCommand() {
    api.removeCommand(command);
  }

  function onSwitchChange({ detail }) {
    api.updateCommand({ ...command, enabled: detail });
  }

  function openEditModal() {
    showEditModal = true;
  }

  function closeEditModal() {
    showEditModal = false;
  }

  function parseUsage(usage) {
    return usage
      .replace(/[ ,]+/g, " ")
      .trim()
      .split(" ")
      .filter((arg) => arg.length)
      .map((arg) => `[${arg}]`)
      .join(" ");
  }

  $: usage = parseUsage(command.usage || "");
</script>

<div class="flex items-center hover:bg-opacity-50 hover:bg-black">
  <div class="p-1 flex flex-auto flex-wrap items-center">
    <div class="p-1">
      <span class="opacity-75">{prefix}</span>{command.name}
      {#if usage}<span class="opacity-50">{usage}</span>{/if}
    </div>
    {#if command.description}
      <div class="p-1 flex-auto">{command.description}</div>
    {/if}
  </div>

  <div class="p-1 flex items-center space-x-1">
    <div class="p-1">
      <Switch enabled="{command.enabled}" on:change="{onSwitchChange}" />
    </div>
    <div
      class="p-1 opacity-50 hover:opacity-100 hover:bg-secondary hover:text-light cursor-pointer rounded-full"
      on:click="{openEditModal}"
    >
      <Icon icon="{MdEdit}" />
    </div>
    <div
      class="p-1 opacity-50 hover:opacity-100 hover:bg-red-600 hover:text-light cursor-pointer rounded-full"
      on:click="{removeCommand}"
    >
      <Icon icon="{MdDeleteForever}" />
    </div>
  </div>
</div>

{#if showEditModal}
  <EditCommand command="{command}" on:close="{closeEditModal}" />
{/if}
