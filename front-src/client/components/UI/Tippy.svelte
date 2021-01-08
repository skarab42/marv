<script>
  import tippy from "sveltejs-tippy";

  export let options;
  export let disabled = false;

  $: _options = { theme: "marv", ...options };
</script>

{#if disabled}
  <slot />
{:else}
  <div use:tippy="{_options}">
    <slot />
  </div>
{/if}
