<script>
  import obs from "@/libs/obs";
  // import { connected, connecting } from "@/stores/obs";
  import Icon from "@/components/UI/Icon.svelte";
  import MdPowerSettingsNew from "svelte-icons/md/MdPowerSettingsNew.svelte";
</script>

<div
  on:click="{obs.connect}"
  class="flex p-2 space-x-2 hover:text-green-500 cursor-pointer"
>
  <Icon icon="{MdPowerSettingsNew}" />
  <div class="hidden md:inline">OBS</div>
</div>
