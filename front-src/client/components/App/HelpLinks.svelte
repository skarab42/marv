<script>
  import { _ } from "@/libs/i18next";
  import { links, url } from "@/libs/docs";
  import MdHelp from "svelte-icons/md/MdHelp.svelte";
</script>

<div class="p-2 flex space-x-2 font-bold tracking-wider bg-secondary">
  <div class="w-6 h-6 ">
    <MdHelp />
  </div>
  <div>{_('words.help')}</div>
</div>

{#each links as link}
  <a class="p-2" href="{url(link.url)}">{_(link.label)}</a>
{/each}
