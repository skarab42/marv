<script>
  import { _ } from "@/libs/i18next";
  import { getStartURL } from "@/libs/docs";
  import { connected } from "@/stores/overlay";
</script>

{#if !$connected}
  <div class="p-2 flex items-center space-x-2 bg-red-600">
    <div>{_('obs.overlay-not-found')}</div>
    <a target="_blank" class="underline text-sm" href="{getStartURL()}">
      {_('sentences.get-started')}
    </a>
  </div>
{/if}
