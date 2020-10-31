<script>
  import Icon from "./Icon.svelte";

  export let cls = "";
  export { cls as class };

  export let pad = "p-2";
  export let dark = true;
  export let icon = null;
  export let iconSize = null;
  export let iconColor = null;
  export let textColor = null;

  let _textColor = dark ? "text-gray-200" : "text-gray-800";

  $: if (!textColor) {
    textColor = _textColor;
  }
</script>

<button
  class="flex items-center space-x-1 {pad} font-medium uppercase rounded {textColor} {cls}"
  {...$$restProps}
  on:click
>
  {#if icon}<Icon {icon} size={iconSize} color={iconColor} />{/if}
  <slot />
</button>
