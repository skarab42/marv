<script>
  import MdMoreVert from "svelte-icons/md/MdMoreVert.svelte";
  import Icon from "@/components/UI/Icon.svelte";

  let opened = false;

  function onMouseEnter() {
    opened = true;
  }

  function onMouseLeave() {
    opened = false;
  }
</script>

<div
  on:mouseleave="{onMouseLeave}"
  class="flex items-center hover:bg-black hover:bg-opacity-25"
>
  <div class="flex {opened ? '' : 'hidden'}">
    <slot />
  </div>
  {#if !opened}
    <div class="p-2 cursor-pointer" on:mouseenter="{onMouseEnter}">
      <Icon icon="{MdMoreVert}" />
    </div>
  {/if}
</div>
