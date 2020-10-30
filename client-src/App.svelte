<script>
  import io from "./libs/socket.io";
  import store from "./api/store";
  import i18n from "./api/i18n";

  (async function() {
    const socket = io();

    socket.on("connect", async () => {
      console.log("connected...");
      console.log(await store.get('app.openOnStartup'));
    });

    socket.on("disconnect", async () => {
      console.log("disconnected...");
    });

    const _ = await i18n();
    console.log(_('pouet.sdfsdf'));
  })()
</script>
