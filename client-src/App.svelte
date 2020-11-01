<script>
  import { connected as appConnected } from "@/stores/app";
  import { emit } from "@/libs/socket.io";

  emit('config.load').then(payload => {
    console.log('config:', payload);
  });
</script>

<div class="p-2">
  connected: {$appConnected}
</div>
