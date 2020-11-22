<script>
  import { store } from "@/stores/app";
  import capitalize from "capitalize";
  import MarvLogo from "@/assets/images/marv.svg";

  const query = new URLSearchParams(location.search);
  const electron = query.has("electron");

  $: title = $store ? capitalize($store.fingerprint) : "";

  function close() {
    window.close();
  }
</script>

<style>
  .drag {
    -webkit-app-region: drag;
  }
</style>

{#if electron}
  <div class="flex items-center text-sm select-none">
    <div class="pl-2">
      <MarvLogo width="16" />
    </div>
    <div class="px-1 m-1 flex-auto drag">{title}</div>
    <div
      on:click="{close}"
      class="px-2 py-1 text-light hover:bg-red-700 cursor-pointer"
    >
      ✕
    </div>
  </div>
{/if}
