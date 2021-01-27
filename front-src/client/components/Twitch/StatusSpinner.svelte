<script>
  export let connected;

  $: color = connected ? "green" : "red";
</script>

<style>
  .spin {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

{#if !connected}
  <div
    class="spin absolute rounded-full"
    style="width:2.2rem; height:2.2rem; background: linear-gradient(90deg, {color}, transparent 35%);"
  ></div>
  <div class="spin absolute bg-primary-darker w-8 h-8 rounded-full"></div>
{/if}
