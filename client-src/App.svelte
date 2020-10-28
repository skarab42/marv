<script>
  import socket from "./libs/socket";
  import store from "./libs/store";

  socket.on("connect", async () => {
    console.log(await store.get('app.openOnStartup'));
  });
</script>
