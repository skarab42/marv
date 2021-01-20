<script>
  import Icon from "@/components/UI/Icon.svelte";

  export let icon = null;
</script>

<div
  on:click
  class="flex gap-2 p-2 font-medium	hover:bg-pink-700 hover:text-gray-300 capitalize cursor-pointer"
>
  {#if icon}
    <div>
      <Icon icon="{icon}" />
    </div>
  {/if}
  <div>
    <slot />
  </div>
</div>
