<script>
  import Icon from "@/components/UI/Icon.svelte";
  import MdExpandMore from "svelte-icons/md/MdExpandMore.svelte";
  import MdExpandLess from "svelte-icons/md/MdExpandLess.svelte";

  export let visible = true;
  export let expended = true;

  let divide = "divide-y divide-blue-600 divide-opacity-50";

  function toggle() {
    expended = !expended;
  }
</script>

{#if visible}
  <div on:click={toggle} class="flex bg-primary-dark cursor-pointer">
    <div class="p-2 flex-auto truncate">
      <slot name="title" />
    </div>
    <div class="p-2">
      <Icon icon={expended ? MdExpandLess : MdExpandMore} class="ml-2 flex-shrink-0" />
    </div>
  </div>
  <div class="{divide} {!expended ? 'hidden' : ''}">
    <slot />
  </div>
{/if}
