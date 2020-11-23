<script>
  import { _ } from "@/libs/i18next";
  import { drawer, hide } from "@/stores/drawer";
  import clickoutside from "@/libs/svelte/click-outside";
  import TwitchLogin from "@/components/Twitch/Login.svelte";
  import OpenOnStartup from "@/components/App/OpenOnStartup.svelte";
  import LanguageSelect from "@/components/App/LanguageSelect.svelte";
  import ConnectAtStartup from "@/components/OBS/ConnectAtStartup.svelte";

  const query = new URLSearchParams(location.search);
  const electron = query.has("electron");

  let top = electron ? 29 : 0;
</script>

{#if $drawer.visible}
  <div
    use:clickoutside
    on:clickoutside="{hide}"
    style="top:{top}px"
    class="absolute z-50 right-0 bottom-0 flex flex-col bg-dark shadow"
  >
    <TwitchLogin />
    <div class="p-2">{_('words.language')}</div>
    <LanguageSelect />
    <OpenOnStartup />
    <ConnectAtStartup />
  </div>
{/if}
