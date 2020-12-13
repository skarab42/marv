<script>
  import api from "@/api/app";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/app";
  import Checkbox from "@/components/UI/Checkbox.svelte";

  function onCheckboxChange() {
    $store.checkUpdateAtStartup = !$store.checkUpdateAtStartup;
    api.setSetting("checkUpdateAtStartup", $store.checkUpdateAtStartup);
  }
</script>

<Checkbox
  on:change="{onCheckboxChange}"
  checked="{$store.checkUpdateAtStartup}"
  label="{_('sentences.check-update-at-startup')}"
/>
