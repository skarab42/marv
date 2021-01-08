<script>
  import { _ } from "@/libs/i18next";
  import Command from "./Command.svelte";
  import { commands } from "@/stores/twitch";
  import AddCommand from "./AddCommand.svelte";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget;
</script>

<WidgetWrapper widget="{widget}">
  <div class="flex flex-col h-full">
    <AddCommand />
    <div
      class="flex-auto overflow-auto divide-y divide-gray-900 divide-opacity-25"
    >
      {#each $commands as command}
        <Command command="{command}" />
      {:else}
        <div class="p-2">{_('twitch.empty-command-list')}</div>
      {/each}
    </div>
  </div>
</WidgetWrapper>
