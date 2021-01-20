<script context="module">
  let closeAllMenu = () => {};
</script>

<script>
  import clickoutside from "@/libs/svelte/click-outside";
  import Portal from "svelte-portal";

  let opened = false;

  let top = 0;
  let left = 0;

  function setPosition(e) {
    top = e.pageY;
    left = e.pageX;
  }

  function openMenu(e) {
    closeAllMenu();
    closeAllMenu = closeMenu;
    setPosition(e);
    opened = true;
  }

  function closeMenu() {
    opened = false;
  }
</script>

<div
  {...$$restProps}
  on:contextmenu|preventDefault|stopPropagation="{openMenu}"
>
  <slot />
</div>

{#if opened}
  <Portal target="body">
    <div
      use:clickoutside
      on:clickoutside="{closeMenu}"
      style="top:{top}px;left:{left}px;"
      class="absolute z-50"
    >
      <slot name="menu" />
    </div>
  </Portal>
{/if}
