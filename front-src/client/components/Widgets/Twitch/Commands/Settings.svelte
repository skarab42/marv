<script>
  import api from "@/api/command";
  import { _ } from "@/libs/i18next";
  import { command } from "@/stores/command";
  import Input from "@/components/UI/Input.svelte";

  // export let data;

  function onPrefixChange({ detail: prefix }) {
    $command.prefix = prefix || "!";
    api.setPrefix($command.prefix);
  }
</script>

<div class="p-2 pt-0 space-y-2 flex flex-col">
  <Input
    label="{_('words.prefix')}"
    value="{$command.prefix}"
    on:update="{onPrefixChange}"
    placeholder="!"
  />
</div>
