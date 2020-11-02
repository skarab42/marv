<script>
  import { on } from "@/libs/socket.io";
  import i18next from "@/libs/i18next";

  import Connected from "@/components/App/Connected.svelte";
  import Connecting from "@/components/App/Connecting.svelte";
  import Disconnected from "@/components/App/Disconnected.svelte";

  let component = Connecting;

  on("connect", async () => {
    component = Connecting;

    await i18next();

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
