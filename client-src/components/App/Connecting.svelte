<script>
  import { _ } from "@/libs/i18next";
  import { initialized } from "@/stores/app";
  import SplashScreen from "./SplashScreen.svelte";

  $: message = $initialized
    ? _("sentences.waiting-for-connexion")
    : "Waiting for connexion";
</script>

<SplashScreen>
  <div class="text-center font-mono">{message}...</div>
</SplashScreen>
