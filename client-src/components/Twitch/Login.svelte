<script>
  import { _ } from "@/libs/i18next";
  import { login } from "@/libs/twitch";
  import { state } from "@/stores/twitch";
  import Icon from "@/components/UI/Icon.svelte";
  import TwitchIcon from "@/assets/images/Twitch_icon.svg";
  import MdAccountCircle from "svelte-icons/md/MdAccountCircle.svelte";

  function onLogin() {
    if ($state.user) return;
    login(true).catch((error) => {
      console.log("error:", error);
    });
  }
</script>

{#if $state.user}
  <div class="flex items-center bg-secondary" on:click="{onLogin}">
    <div class="p-2 pr-0">
      <TwitchIcon width="16" fill="#fefefe" />
    </div>
    <div class="p-2 flex-auto font-bold">{$state.user.display_name}</div>
    <div class="p-2">
      <img
        class="w-6 h-6 rounded-full"
        src="{$state.user.profile_image_url}"
        alt="{$state.user.display_name}"
      />
    </div>
  </div>
{:else}
  <div
    on:click="{onLogin}"
    class="flex items-center bg-secondary hover:bg-secondary-dark cursor-pointer"
  >
    <div class="p-2 pr-0">
      <TwitchIcon width="16" fill="#fefefe" />
    </div>
    <div class="flex-auto p-2 font-bold">
      {_('sentences.connect-with-twitch')}
    </div>
    <div class="p-2">
      <Icon icon="{MdAccountCircle}" />
    </div>
  </div>
{/if}
