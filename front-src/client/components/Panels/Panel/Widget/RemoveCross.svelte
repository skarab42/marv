<script>
  // export let position = "absolute top-0 right-0";
</script>

<style>
  .text-shadow {
    text-shadow: 1px 1px rgba(0, 0, 0, 0.2), -1px 1px rgba(0, 0, 0, 0.2),
      -1px -1px rgba(0, 0, 0, 0.2), 1px -1px rgba(0, 0, 0, 0.2);
  }
</style>

<span
  on:click
  {...$$restProps}
  style="top:-5px;right:-5px;"
  class="absolute inline-block px-1 rounded text-shadow bg-red-600 cursor-pointer"
>✕</span>
