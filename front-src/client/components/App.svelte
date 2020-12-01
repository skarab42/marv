<script>
  import { on } from "@/libs/socket.io";
  import i18next from "@/libs/i18next";

  import obsStore from "@/stores/obs";
  import filesStore from "@/stores/files";
  import panelsStore from "@/stores/panels";
  import twitchStore from "@/stores/twitch";
  import actionsStore from "@/stores/actions";
  import i18nextStore from "@/stores/i18next";
  import { loadUsedFonts } from "../../libs/fonts";
  import appStore, { initialized } from "@/stores/app";

  import Connected from "@/components/App/Connected.svelte";
  import Connecting from "@/components/App/Connecting.svelte";
  import Disconnected from "@/components/App/Disconnected.svelte";
  import ElectronTopbar from "@/components/App/ElectronTopbar.svelte";

  let component = Connecting;

  async function initialize() {
    await i18next(await i18nextStore());
    await actionsStore();
    await panelsStore();
    await twitchStore();
    await filesStore();
    await appStore();
    await obsStore();

    loadUsedFonts();

    initialized.set(true);
  }

  on("connect", async () => {
    component = Connecting;

    await initialize();

    setTimeout(() => {
      if (component !== Disconnected) {
        component = Connected;
      }
    }, 1000);
  });

  on("disconnect", () => {
    component = Disconnected;
  });
</script>

<div class="flex flex-col h-full">
  <ElectronTopbar />
  <svelte:component this="{component}" />
</div>

<div id="modal"></div>
