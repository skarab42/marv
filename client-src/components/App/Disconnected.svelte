<script>
  import { _ } from "@/libs/i18next";
  import { app } from "@/stores/app";
  import SplashScreen from "./SplashScreen.svelte";

  $: fingerprint = $app ? $app.fingerprint : "010110110101s";
</script>

<SplashScreen>
  <div class="text-center font-mono text-2xl capitalize">
    {_('words.disconnected')}!
  </div>
  <div class="text-center font-mono">
    {_('sentences.waiting-for-connexion')}...
  </div>
</SplashScreen>
