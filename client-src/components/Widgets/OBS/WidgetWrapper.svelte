<script>
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";
</script>

<div class="relative h-full">
  <slot />
  {#if !$state.connected}
    <div class="absolute inset-0 bg-black bg-opacity-75">
      <div class="flex justify-center items-center h-full">
        <div
          class="p-auto transform -rotate-45 p-2 bg-red-600 opacity-75 rounded shadow"
        >
          <span>{_('sentences.obs-not-connected')}</span>
        </div>
      </div>
    </div>
  {/if}
</div>
