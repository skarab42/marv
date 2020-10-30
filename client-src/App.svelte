<script>
  import io from "./libs/socket.io";
  import i18n from "./api/i18n";

  import Loading from "./components/App/Loading.svelte";
  import Dashboard from "./components/App/Dashboard.svelte";

  let component = Loading;

  (async function() {
    const socket = io();

    socket.on("connect", async () => {
      await i18n();
      setTimeout(() => {
        component = Dashboard;
      }, 500);
    });

    socket.on("disconnect", () => {
      component = Loading;
    });
  })()
</script>

<svelte:component this={component} />
