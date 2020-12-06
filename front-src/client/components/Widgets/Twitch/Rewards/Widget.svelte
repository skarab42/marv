<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Reward from "./Reward.svelte";
  import { rewards } from "@/stores/twitch";
  import Button from "@/components/UI/Button.svelte";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget;

  async function onRefresh() {
    $rewards = await api.getRewardList();
  }
</script>

<WidgetWrapper widget="{widget}">
  <Button
    icon="{MdRefresh}"
    on:click="{onRefresh}"
    class="w-full p-2 bg-white bg-opacity-25"
  >
    <span>{_('words.refresh')}</span>
  </Button>
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
