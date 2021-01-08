<script>
  import api from "@/api/app";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/app";
  import Checkbox from "@/components/UI/Checkbox.svelte";

  let checked = !$store.openOnStartup;

  function onChange(event) {
    checked = event.target.checked;
    $store.openOnStartup = !checked;
    api.setSetting("openOnStartup", !checked);
  }
</script>

<Checkbox
  checked="{checked}"
  on:change="{onChange}"
  label="{_('sentences.electron-open-on-startup')}"
/>
