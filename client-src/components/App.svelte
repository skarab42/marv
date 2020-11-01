<script>
  import { on } from "@/libs/socket.io";
  import i18next from "@/libs/i18next";

  import Loading from "@/components/App/Loading.svelte";
  import Connected from "@/components/App/Connected.svelte";
  import Disconnected from "@/components/App/Disconnected.svelte";

  let component = Loading;

  on("connect", async () => {
    component = Loading;

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
