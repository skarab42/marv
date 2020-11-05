<script>
  export let borders;
  export let position = "absolute top-0 right-0 px-1";
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
  class="{position} {borders} text-shadow hover:bg-red-800 cursor-pointer"
>✕</span>
