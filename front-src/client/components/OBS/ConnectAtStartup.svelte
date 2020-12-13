<script>
  import api from "@/api/obs";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/obs";
  import Checkbox from "@/components/UI/Checkbox.svelte";

  let checked = $store.connectOnStartup;

  function onChange(event) {
    checked = event.target.checked;
    $store.connectOnStartup = checked;
    api.setSetting("connectOnStartup", checked);
  }
</script>

<Checkbox
  checked="{checked}"
  on:change="{onChange}"
  label="{_('obs.connect-at-startup')}"
/>
