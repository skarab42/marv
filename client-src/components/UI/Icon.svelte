<script>
  export let icon;
  export let size = "md";
  export let flex = true;
  export let block = true;
  export let color = null;

  export let cls = "";
  export { cls as class };

  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  $: _flex = flex ? "flex" : "";
  $: _size = sizes[size] || sizes.md;
  $: _block = block ? "inline-block" : "";
</script>

<span on:click class="{_flex} {_size} {_block} {color} {cls}">
  <svelte:component this="{icon}" />
</span>
