<script>
  import { _ } from "@/libs/i18next";
  import SplashScreen from "./SplashScreen.svelte";
  import { initialized, fingerprint } from "@/stores/app";

  let message = "Waiting for connexion";

  $: if ($initialized) {
    document.title = fingerprint;
    message = _("sentences.waiting-for-connexion");
  }
</script>

<SplashScreen>
  <div class="text-center font-mono">{message}...</div>
</SplashScreen>
