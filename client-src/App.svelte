<script>
  import socket from "./libs/socket";
  import store from "./libs/store";
  import i18n from "./libs/i18n";

  (async function(){
    let _ = await i18n();
    console.log(_('key'));

    socket.on("connect", async () => {
      console.log(await store.get('app.openOnStartup'));
    });
  })()
</script>
