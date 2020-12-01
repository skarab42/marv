<script>
  import api from "@/api/twitch";
  import Icon from "@/components/UI/Icon.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let prefix;
  export let command;

  function removeCommand() {
    api.removeCommand(command);
  }

  function onCheckboxChange({ target }) {
    api.updateCommand({ ...command, enabled: target.checked });
  }
</script>

<div class="flex items-center hover:bg-opacity-50 hover:bg-black">
  <div class="p-1 flex flex-auto flex-wrap items-center">
    <div class="p-1 flex-shrink-0">
      <span class="opacity-75">{prefix}</span>{command.name}
      {#if command.usage}<span class="opacity-50">{command.usage}</span>{/if}
    </div>
    {#if command.desciption}
      <div class="p-1 flex-auto">{command.desciption}</div>
    {/if}
  </div>
  <div class="p-1 flex space-x-1">
    <div class="p-1">
      <input
        type="checkbox"
        checked="{command.enabled}"
        on:change="{onCheckboxChange}"
      />
    </div>
    <div
      class="p-1 opacity-50 hover:opacity-100 hover:bg-red-600 hover:text-light cursor-pointer rounded-full"
      on:click="{removeCommand}"
    >
      <Icon icon="{MdDeleteForever}" />
    </div>
  </div>
</div>
