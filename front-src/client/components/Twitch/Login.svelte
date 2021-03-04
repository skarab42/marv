<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import StatusLine from "./StatusLine.svelte";
  import StatusSpinner from "./StatusSpinner.svelte";
  import { user, chat, pubsub } from "@/stores/twitch";
  import TwitchIcon from "@/assets/images/Twitch_icon.svg";

  function onLogin() {
    api.login(true).catch((error) => {
      console.log("error:", error);
    });
  }

  let status = false;

  function showStatus() {
    status = true;
  }

  function hideStatus() {
    status = false;
  }

  $: connected = $chat.connected && $pubsub.connected;
</script>

{#if $user}
  <div
    class="relative flex px-2 flex-shrink-0 py-1 items-center justify-center"
    on:click="{onLogin}"
    on:mouseenter="{showStatus}"
    on:mouseleave="{hideStatus}"
  >
    <StatusSpinner connected="{connected}" />
    <img
      class="z-10 w-8 h-8 rounded-full"
      src="{$user.profile_image_url}"
      alt="{$user.display_name}"
    />
    {#if status}
      <div
        on:mouseleave|stopPropagation
        class="absolute p-2 text-gray-800 bg-gray-300 rounded"
        style="top:40px; right:0px; z-index:500;"
      >
        <StatusLine label="Chat" status="{$chat}" on:click="{onLogin}" />
        <StatusLine label="PubSub" status="{$pubsub}" />
      </div>
    {/if}
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
