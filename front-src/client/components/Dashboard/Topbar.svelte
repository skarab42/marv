<script>
  import { _ } from "@/libs/i18next";
  import { editMode } from "@/stores/panels";
  import DrawerToggle from "./DrawerToggle.svelte";
  import Flexbar from "@/components/UI/Flexbar.svelte";
  import OBSStatus from "@/components/OBS/Status.svelte";
  import OBSConnect from "@/components/OBS/Connect.svelte";
  import TwitchLogin from "@/components/Twitch/Login.svelte";
  import Notices from "@/components/App/Notify/Notices.svelte";
  import FlexbarSpacer from "@/components/UI/Flexbar/Spacer.svelte";
  import StreamStatus from "@/components/Twitch/StreamStatus.svelte";

  $: bgColor = $editMode ? "bg-pink-700" : "bg-primary-darker";
  $: toggleBgColor = $editMode ? "bg-pink-700" : "bg-primary";
</script>

<Flexbar bgColor="{bgColor}">
  {#if $editMode}
    <div class="p-2 flex-auto font-bold text-center uppercase">
      {_('sentences.edit-mode')}
    </div>
  {:else}
    <OBSConnect />
    <OBSStatus />
    <StreamStatus />
    <FlexbarSpacer />
  {/if}
  <Notices />
  <TwitchLogin />
  <DrawerToggle bgColor="{toggleBgColor}" />
</Flexbar>
