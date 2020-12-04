<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Switch from "@/components/UI/Switch.svelte";

  export let reward;

  // function onSwitchChange({ detail }) {
  //   api.updateReward({ id: reward.id, isPaused: detail }).catch((error) => {
  //     console.log("ERROR >>>", error);
  //   });
  // }

  function image(reward) {
    return (reward.image || reward.default_image).url_1x;
  }
</script>

<div class="relative flex flex-auto">
  <div class="p-2 flex flex-auto flex-col overflow-hidden">
    <div class="px-2 flex items-center space-x-2">
      <img src="{image(reward)}" alt="{reward.title}" class="h-6" />
      <span class="font-bold">{reward.title}</span>
      <span
        class="text-xs px-2 bg-black bg-opacity-25 rounded-full"
      >{reward.cost}</span>
    </div>
    <div class="px-2 break-words text-sm opacity-75">{reward.prompt}</div>
  </div>
  <!-- <div class="p-2">
    <Switch enabled="{!reward.is_paused}" on:change="{onSwitchChange}" />
  </div> -->
  {#if !reward.is_enabled}
    <div
      class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        class="p-2 bg-red-600 bg-opacity-50 text-light rounded transform -rotate-45 shadow"
      >
        {_('words.disabled')}
      </div>
    </div>
  {/if}
</div>
