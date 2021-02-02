<script context="module">
  let closeAllMenu = () => {};
</script>

<script>
  import clickoutside from "@/libs/svelte/click-outside";
  import { createEventDispatcher } from "svelte";
  import Portal from "svelte-portal";

  const dispatch = createEventDispatcher();

  let opacity = 0;
  let opened = false;
  let menuElement = null;

  let top = 0;
  let left = 0;

  function setPosition(e) {
    let x = e.pageX;
    let y = e.pageY;

    const { width, height } = menuElement.getBoundingClientRect();
    const xOverflow = window.innerWidth - (x + width);
    const yOverflow = window.innerHeight - (y + height);

    if (xOverflow < 0) x += xOverflow;
    if (yOverflow < 0) y += yOverflow;

    top = Math.max(0, y);
    left = Math.max(0, x);
    opacity = 1;
  }

  function openMenu(e) {
    closeAllMenu();
    closeAllMenu = closeMenu;
    opacity = 0;
    opened = true;
    dispatch("open");
    setTimeout(() => setPosition(e));
  }

  function closeMenu() {
    opened = false;
    dispatch("close");
  }
</script>

<div
  {...$$restProps}
  on:contextmenu|preventDefault|stopPropagation="{openMenu}"
>
  <slot opened="{opened}" />
</div>

{#if opened}
  <Portal target="body">
    <div
      use:clickoutside
      on:click="{closeMenu}"
      on:clickoutside="{closeMenu}"
      bind:this="{menuElement}"
      style="top:{top}px;left:{left}px;opacity:{opacity};"
      class="absolute z-50"
    >
      <slot name="menu" />
    </div>
  </Portal>
{/if}
