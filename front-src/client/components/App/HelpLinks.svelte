<script>
  import { _ } from "@/libs/i18next";
  import { getStartURL } from "@/libs/docs";
  import MdHelp from "svelte-icons/md/MdHelp.svelte";
</script>

<div class="mt-2 p-2 flex space-x-2 font-bold tracking-wider bg-secondary">
  <div class="w-6 h-6">
    <MdHelp />
  </div>
  <div class="uppercase">{_('words.help')}</div>
</div>

<div class="flex flex-col p-1 space-y-1">
  <a href="{getStartURL()}" target="_blank">{_('sentences.get-started')}</a>
</div>
