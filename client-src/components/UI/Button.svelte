<script>
  import Icon from "./Icon.svelte";

  export let cls = "";
  export { cls as class };

  export let dark = true;
  export let icon = null;
  export let iconSize = null;
  export let iconColor = null;
  export let textColor = null;
  export let padding = "px-4 py-2";

  let _textColor = dark ? "text-light" : "text-dark";

  $: if (!textColor) {
    textColor = _textColor;
  }
</script>

<style>
  button:focus {
    outline: none;
  }
</style>

<button
  class="flex items-center space-x-1 {padding} font-medium uppercase rounded {textColor} {cls}"
  {...$$restProps}
  on:click
>
  {#if icon}
    <Icon icon="{icon}" size="{iconSize}" color="{iconColor}" />
  {/if}
  <slot />
</button>
