<script>
  import { connected as appConnected } from "@/stores/app";
  import { emit } from "@/libs/socket.io";

  emit('config.load');
</script>

<div class="p-2">
  connected: {$appConnected}
</div>
