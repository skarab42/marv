<script>
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";

  function label({ connected, connecting }) {
    if (connected) {
      return _("words.connected");
    } else if (connecting) {
      return `${_("sentences.waiting-for-connexion")}...`;
    } else {
      return _("words.disconnected");
    }
  }
</script>

<div class="truncate">
  <span>OBS</span>
  <span class="lowercase">{label($state)}</span>
</div>
