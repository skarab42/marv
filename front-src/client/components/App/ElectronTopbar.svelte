<script>
  import { electron, fingerprint } from "@/stores/app";
  import MarvLogo from "@/assets/images/marv.svg";

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
    <div class="px-1 m-1 flex-auto drag">{fingerprint}</div>
    <div
      on:click="{close}"
      class="px-2 py-1 text-light hover:bg-red-700 cursor-pointer"
    >
      ✕
    </div>
  </div>
{/if}
