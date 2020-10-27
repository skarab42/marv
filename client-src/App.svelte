<script>
  import socket from "./libs/socket";
  import store from "./libs/store";

  socket.on("connect", async () => {
    console.log(await store.get('app.openOnStartup'));
    console.log(await store.set('app.prout', "pouet"));
    console.log(await store.delete('app.prout'));
    console.log(await store.get('app.prout', 42));
    console.log(await store.set('app.openOnStartup', true));
  });
</script>
