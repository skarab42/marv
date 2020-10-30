<script>
  import socket from "./libs/socket";
  import store from "./libs/store";
  import i18n from "./libs/i18n";

  (async function(){
    let _ = await i18n();
    console.log(_('pouet.sdfsdf'));

    socket.on("connect", async () => {
      console.log("connected...");
      console.log(await store.get('app.openOnStartup'));
    });

    socket.on("disconnect", async () => {
      console.log("disconnected...");
    });
  })()
</script>
