<script>
  import { _ } from "@/libs/i18next";
  import Reward from "./Reward.svelte";
  import { rewards } from "@/stores/twitch";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget;
</script>

<WidgetWrapper widget="{widget}">
  <div
    class="flex flex-col h-full overflow-auto divide-y divide-gray-900 divide-opacity-25"
  >
    {#each $rewards as reward}
      <Reward reward="{reward}" />
    {:else}
      <div class="p-2">{_('twitch.empty-reward-list')}</div>
    {/each}
  </div>
</WidgetWrapper>
