<script>
  import { _ } from "@/libs/i18next";
  import capitalize from "capitalize";
  import { initialized, store } from "@/stores/app";
  import SplashScreen from "./SplashScreen.svelte";

  let message = "Waiting for connexion";

  $: if ($initialized) {
    document.title = capitalize($store.fingerprint);
    message = _("sentences.waiting-for-connexion");
  }
</script>

<SplashScreen>
  <div class="text-center font-mono">{message}...</div>
</SplashScreen>
