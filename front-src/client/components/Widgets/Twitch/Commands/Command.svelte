<script>
  import api from "@/api/twitch";
  import Icon from "@/components/UI/Icon.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import Switch from "@/components/UI/Switch.svelte";
  import MdCode from "svelte-icons/md/MdCode.svelte";
  import ItemMenu from "@/components/UI/ItemMenu.svelte";
  import EditCommandModal from "./EditCommandModal.svelte";
  import { command as commandStore } from "@/stores/command";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";
  import ConditionModal from "@/components/ConditionBuilder/Modal.svelte";
  import MdSettingsEthernet from "svelte-icons/md/MdSettingsEthernet.svelte";

  export let command;

  let showEditModal = false;
  let conditionModalOpened = false;

  $: usage = parseUsage(command.usage || "");
  $: rulesIcon =
    command.rules && command.rules.length ? MdSettingsEthernet : MdCode;

  let ts =
    "text-shadow: 0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)";

  function removeCommand() {
    api.removeCommand(command);
  }

  function onSwitchChange({ detail }) {
    api.updateCommand({ ...command, enabled: detail });
  }

  function openEditModal() {
    showEditModal = true;
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

  function openConditionBuilderModal() {
    conditionModalOpened = true;
  }

  function onSelectedCommandUpdate({ detail }) {
    api.updateCommand({ ...command, ...detail });
  }

  let buttonClass = "p-2 cursor-pointer hover:bg-secondary";
</script>

<div class="flex items-center hover:bg-opacity-50 hover:bg-black" style="{ts}">
  <div class="p-1 flex flex-auto flex-wrap items-center">
    <div class="p-1">
      <div class="px-2 bg-black bg-opacity-25 rounded">
        <span class="opacity-75">{$commandStore.prefix}</span>{command.name}
        {#if usage}<span class="opacity-50">{usage}</span>{/if}
      </div>
    </div>
    {#if command.description}
      <div class="p-1 flex-auto">{command.description}</div>
    {/if}
  </div>

  <div class="flex items-center gap-2">
    <ItemMenu>
      <div class="{buttonClass}" on:click="{openEditModal}">
        <Icon icon="{MdEdit}" />
      </div>
      <div class="{buttonClass}" on:click="{openConditionBuilderModal}">
        <Icon icon="{rulesIcon}" />
      </div>
      <div class="{buttonClass}" on:click="{removeCommand}">
        <Icon icon="{MdDeleteForever}" />
      </div>
    </ItemMenu>
    <div class="p-1">
      <Switch enabled="{command.enabled}" on:change="{onSwitchChange}" />
    </div>
  </div>
</div>

<EditCommandModal bind:opened="{showEditModal}" command="{command}" />

<ConditionModal
  event="{command}"
  on:update="{onSelectedCommandUpdate}"
  bind:opened="{conditionModalOpened}"
/>
