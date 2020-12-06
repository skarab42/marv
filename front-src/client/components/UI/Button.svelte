<script>
  import Icon from "./Icon.svelte";

  export let cls = "";
  export { cls as class };

  export let dark = true;
  export let icon = null;
  export let iconSize = null;
  export let iconColor = null;
  export let textColor = null;
  export let padding = "p-2";

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
  class="flex items-center justify-center space-x-2 {padding} font-medium uppercase {textColor} {cls}"
  {...$$restProps}
  on:click
>
  {#if icon}
    <Icon icon="{icon}" size="{iconSize}" color="{iconColor}" />
  {/if}
  <slot />
</button>
