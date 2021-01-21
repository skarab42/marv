<script>
  import api from "@/api/panels";
  import { currentPanel } from "@/stores/panels";
  import Input from "@/components/UI/Input.svelte";

  function onUpdate({ detail }) {
    api.update({ ...$currentPanel, name: detail });
  }
</script>

<Input value="{$currentPanel.name}" on:update="{onUpdate}" />
