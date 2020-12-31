<script>
  import { url } from "@/libs/docs";
  import { _ } from "@/libs/i18next";
  import { connected } from "@/stores/overlay";

  $: console.log($connected);
</script>

{#if !$connected}
  <div class="p-2 flex space-x-2 bg-red-600">
    <div>{_('obs.overlay-not-found')}</div>
    <a class="underline text-sm" href="{url('get-started#overlay')}">
      (
      {_('docs.get-started.overlay')}
      )
    </a>
  </div>
{/if}
