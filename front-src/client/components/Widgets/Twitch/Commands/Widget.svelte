<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Command from "./Command.svelte";
  import AddCommand from "./AddCommand.svelte";
  import { commands } from "@/stores/twitch";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget;

  let prefix = "#";

  api.getCommandPrefix().then((p) => (prefix = p));
</script>

<WidgetWrapper widget="{widget}">
  <div class="flex flex-col h-full">
    <AddCommand prefix="{prefix}" />
    <div
      class="flex-auto overflow-auto divide-y divide-gray-900 divide-opacity-25"
    >
      {#each $commands as command}
        <Command prefix="{prefix}" command="{command}" />
      {:else}
        <div class="p-2">{_('twitch.empty-command-list')}</div>
      {/each}
    </div>
  </div>
</WidgetWrapper>
