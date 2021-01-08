<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import { user } from "@/stores/twitch";
  import TwitchIcon from "@/assets/images/Twitch_icon.svg";

  function onLogin() {
    if ($user) return;
    api.login(true).catch((error) => {
      console.log("error:", error);
    });
  }
</script>

{#if $user}
  <div class="flex px-2 py-1 items-center" on:click="{onLogin}">
    <img
      class="w-8 h-8 rounded-full"
      src="{$user.profile_image_url}"
      alt="{$user.display_name}"
    />
  </div>
{:else}
  <div
    on:click="{onLogin}"
    class="px-2 flex items-center bg-secondary hover:bg-secondary-dark cursor-pointer"
  >
    <div class="p-2">
      <TwitchIcon width="21" fill="#fefefe" />
    </div>
    <div class="hidden lg:block flex-auto p-2 font-bold">
      {_('sentences.connect-with-twitch')}
    </div>
  </div>
{/if}
