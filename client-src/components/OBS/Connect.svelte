<script>
  import obs from "@/libs/obs";
  import { state } from "@/stores/obs";
  import Icon from "@/components/UI/Icon.svelte";
  import MdPowerSettingsNew from "svelte-icons/md/MdPowerSettingsNew.svelte";

  function toggle() {
    if ($state.connected || $state.connecting) {
      obs.disconnect();
    } else {
      obs.connect();
    }
  }

  function color({ connected, connecting }) {
    if (connected) {
      return "text-green-600 hover:text-red-600";
    } else if (connecting) {
      return "text-orange-600 hover:text-red-600";
    } else {
      return "hover:text-green-600";
    }
  }
</script>

<div
  on:click="{toggle}"
  class="flex p-2 space-x-2 cursor-pointer {color($state)}"
>
  <Icon icon="{MdPowerSettingsNew}" />
  <div class="hidden md:inline">OBS</div>
</div>
