<script>
  import { _ } from "@/libs/i18next";
  import { electron } from "@/stores/app";
  import { drawer, hide } from "@/stores/drawer";
  import GiHearts from "svelte-icons/gi/GiHearts.svelte";
  import clickoutside from "@/libs/svelte/click-outside";
  import HelpLinks from "@/components/App/HelpLinks.svelte";
  import FaCcPaypal from "svelte-icons/fa/FaCcPaypal.svelte";
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
    <div class="p-2">{_('words.language')}</div>
    <LanguageSelect />
    <OpenOnStartup />
    <OBSConnectAtStartup />
    <TwitchConnectAtStartup />
    <CheckUpdateCheckbox />
    <HelpLinks />
    <dir class="flex-auto"></dir>
    <div class="p-2">
      <a
        class="p-2 flex items-center space-x-5 justify-center bg-pink-600 rounded"
        href="https://paypal.me/skarab"
        target="_blank"
      >
        <div class="relative truncate px-5 text-4xl">
          {_('words.donate')}
          <span class="absolute top-0 right-0 w-6 h-6"><GiHearts /></span>
        </div>
        <div class="w-20">
          <FaCcPaypal />
        </div>
      </a>
    </div>
  </div>
{/if}
