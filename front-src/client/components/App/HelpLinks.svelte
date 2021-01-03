<script>
  import { _ } from "@/libs/i18next";
  import { links, url } from "@/libs/docs";
  import MdHelp from "svelte-icons/md/MdHelp.svelte";
</script>

<div class="mt-2 p-2 flex space-x-2 font-bold tracking-wider bg-secondary">
  <div class="w-6 h-6">
    <MdHelp />
  </div>
  <div class="uppercase">{_('words.help')}</div>
</div>

<div class="flex flex-col p-1 space-y-1">
  {#each links as link}
    <a
      class="px-2 hover:text-pink-600"
      href="{url(link.url)}"
      target="_blank"
    >{_(link.label)}</a>
  {/each}
</div>
