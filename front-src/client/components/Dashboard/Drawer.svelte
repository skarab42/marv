<script>
  import { _ } from "@/libs/i18next";
  import { electron } from "@/stores/app";
  import Donate from "../App/Donate.svelte";
  import { drawer, hide } from "@/stores/drawer";
  import clickoutside from "@/libs/svelte/click-outside";
  import HelpLinks from "@/components/App/HelpLinks.svelte";
  import OpenOnStartup from "@/components/App/OpenOnStartup.svelte";
  import LanguageSelect from "@/components/App/LanguageSelect.svelte";
  import OBSConnectAtStartup from "@/components/OBS/ConnectAtStartup.svelte";
  import CheckUpdateCheckbox from "@/components/App/CheckUpdateCheckbox.svelte";
  import TwitchConnectAtStartup from "@/components/Twitch/ConnectAtStartup.svelte";

  let top = electron ? 29 : 0;
</script>

{#if $drawer.visible}
  <div
    use:clickoutside
    on:clickoutside="{hide}"
    style="top:{top}px; max-width:300px;"
    class="absolute z-50 right-0 bottom-0 flex flex-col bg-dark shadow overflow-y-auto"
  >
    <LanguageSelect />
    <div class="flex flex-col divide-y divide-gray-800 divide-opacity-50">
      <OpenOnStartup />
      <OBSConnectAtStartup />
      <TwitchConnectAtStartup />
      <CheckUpdateCheckbox />
    </div>
    <HelpLinks />
    <div class="flex-auto"></div>
    <Donate />
  </div>
{/if}
