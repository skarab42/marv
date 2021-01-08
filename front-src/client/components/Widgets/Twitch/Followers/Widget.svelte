<script>
  import { _ } from "@/libs/i18next";
  import Follower from "./Follower.svelte";
  import { followers } from "@/stores/twitch";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget = null;
</script>

<WidgetWrapper widget="{widget}">
  <div class="flex flex-col h-full">
    <div
      class="flex-auto overflow-auto divide-y divide-gray-900 divide-opacity-25"
    >
      {#each $followers as follower}
        <Follower follower="{follower}" />
      {:else}
        <div class="p-2">{_('twitch.empty-follower-list')}</div>
      {/each}
    </div>
  </div>
</WidgetWrapper>
