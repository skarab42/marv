<script>
  import DrawerToggle from "./Drawer/Toggle.svelte";
  import Flexbar from "@/components/UI/Flexbar.svelte";
  import OBSStatus from "@/components/OBS/Status.svelte";
  import OBSConnect from "@/components/OBS/Connect.svelte";
  import TwitchLogin from "@/components/Twitch/Login.svelte";
  import FlexbarSpacer from "@/components/UI/Flexbar/Spacer.svelte";
  import StreamStatus from "@/components/Twitch/StreamStatus.svelte";
</script>

<Flexbar bgColor="bg-primary-darker">
  <OBSConnect />
  <OBSStatus />
  <StreamStatus />
  <FlexbarSpacer />
  <TwitchLogin />
  <DrawerToggle />
</Flexbar>
