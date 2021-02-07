<script>
  import { _ } from "@/libs/i18next";
  import Panel from "../Panel.svelte";

  export let info;

  function humanLabel(label) {
    return _(`labels.${label}`);
  }
</script>

<Panel title="{_('words.info')}" {...$$restProps}>
  {#each info as [key, value] (key)}
    <div class="p-2 flex space-x-2 items-center">
      <div class="flex-auto">{humanLabel(key)}</div>
      <div>{value}</div>
    </div>
  {/each}
</Panel>
