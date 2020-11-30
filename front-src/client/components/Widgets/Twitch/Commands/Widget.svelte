<script>
  import api from "@/api/twitch";
  import { commands } from "@/stores/twitch";
  import Icon from "@/components/UI/Icon.svelte";
  import Input from "@/components/UI/Input.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let widget = null;

  let value = "";

  function setCommand({ detail: event }) {
    value = event.target.value;
  }

  function addCommand() {
    if (!value) return;
    api.addCommand({ name: value });
    value = "";
  }

  function onEnterKey(event) {
    setCommand(event);
    addCommand();
  }

  function removeCommand(command) {
    api.removeCommand(command);
  }
</script>

<div class="relative h-full flex flex-col">
  <div class="p-2 flex">
    <Input
      label="#"
      value="{value}"
      rootClass="flex-auto"
      on:input="{setCommand}"
      on:enterKey="{onEnterKey}"
    />
    <Button on:click="{addCommand}">add</Button>
  </div>

  <div class="p-2 flex flex-col flex-auto space-y-2 overflow-auto">
    {#each $commands as command}
      <div class="flex space-x-2 bg-light text-dark bg-opacity-50 rounded">
        <div class="p-2 flex-auto font-bold">#{command.name}</div>
        <div
          class="p-2 hover:bg-red-600 hover:text-light cursor-pointer rounded-r"
          on:click="{removeCommand.bind(null, command)}"
        >
          <Icon icon="{MdDeleteForever}" />
        </div>
      </div>
    {:else}
      <div class="p-2">Empty command list...</div>
    {/each}
  </div>
</div>
