<script>
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/app";
  import MdHelp from "svelte-icons/md/MdHelp.svelte";

  $: docsURL = `http://localhost:3000/${$store.language}/docs`;

  function url(uri) {
    return `${docsURL}/${uri}`;
  }

  const links = [
    { url: "get-started#obs", label: "docs.get-started.obs" },
    { url: "get-started#overlay", label: "docs.get-started.overlay" },
  ];
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
