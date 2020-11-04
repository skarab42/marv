<script>
  import api from "@/libs/panels";
  import { _ } from "@/libs/i18next";
  import { currentPanel } from "@/stores/panels";
  import InputText from "@/components/UI/InputText.svelte";

  function onUpdate({ detail }) {
    api.update({ ...$currentPanel, name: detail });
  }
</script>

<InputText
  label="{_('words.rename')}"
  value="{$currentPanel.name}"
  on:update="{onUpdate}"
/>
