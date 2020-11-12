<script>
  import { onMount } from "svelte";

  let element = null;
  let modalWrapper = document.querySelector("#modal");

  onMount(() => {
    modalWrapper.appendChild(element);
  });
</script>

<div bind:this="{element}" class="absolute inset-0 z-50">
  <slot />
</div>
