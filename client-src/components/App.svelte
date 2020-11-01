<script>
  import { io } from "@/libs/socket.io";
  import { initialized } from'@/stores/app';
  import { init as i18nextInit } from'@/libs/i18next';
  import { load as configLoad } from "@/stores/config";
  import Loading from "@/components/App/Loading.svelte";
  import Connected from "@/components/App/Connected.svelte";
  import Disconnected from "@/components/App/Disconnected.svelte";

  const socket = io();
  let component = Loading;

  socket.on("connect", async () => {
    component = Loading;

    if (!$initialized) {
      const config = await configLoad();
      await i18nextInit(config.i18next);
    }

    $initialized = true;

    setTimeout(() => {
      component = Connected;
    }, 1000);
  });

  socket.on("disconnect", () => {
    component = Disconnected;
  });
</script>

<svelte:component this={component} />
