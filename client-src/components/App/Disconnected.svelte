<script>
  import { _ } from "@/libs/i18next";
  import SplashScreen from "@/components/UI/SplashScreen.svelte";
</script>

<SplashScreen>
  <div class="text-center font-mono text-2xl capitalize">
    {_('words.disconnected')}
  </div>
  <div class="text-center font-mono">
    {_('sentences.waiting-for-connexion')}
  </div>
</SplashScreen>
