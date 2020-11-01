<script>
  import obs from "@/api/obs";
  import { connected, connecting } from "@/stores/obs";
  import Icon from "@/components/UI/Icon.svelte";
  import MdPowerSettingsNew from "svelte-icons/md/MdPowerSettingsNew.svelte";

  $: console.log($connected, $connecting);

  function connect() {
    obs.connect().then(r => {
      console.log({ r });
    });
  }
</script>

<div class="flex p-2">
  <Icon
    on:click={connect}
    icon={MdPowerSettingsNew}
    class="hover:text-green-500 cursor-pointer"
  />
</div>
