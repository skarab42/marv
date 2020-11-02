<script>
  import { app } from "@/stores/app";
  import SplashScreen from "./SplashScreen.svelte";

  $: fingerprint = $app ? $app.fingerprint : "010110110101s";
</script>

<SplashScreen>
  <div class="text-center font-mono text-2xl">Connecting...</div>
</SplashScreen>
