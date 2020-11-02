<script>
  import { on } from "@/libs/socket.io";
  import i18next from "@/libs/i18next";

  import obsStore from "@/stores/obs";
  import i18nextStore from "@/stores/i18next";
  import appStore, { initialized } from "@/stores/app";

  import Connected from "@/components/App/Connected.svelte";
  import Connecting from "@/components/App/Connecting.svelte";
  import Disconnected from "@/components/App/Disconnected.svelte";

  let component = Connecting;

  async function initialize() {
    await i18next(await i18nextStore());
    await appStore();
    await obsStore();

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

<svelte:component this="{component}" />
