<script>
  import Icon from "@/components/UI/Icon.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label;
  export let value;
  export let removable = false;

  function remove() {
    dispatch("remove", label);
  }
</script>

<div class="p-2 flex items-center">
  <div class="flex items-center w-1/2">
    <div class="flex-1 truncate">{label}</div>
    {#if removable}
      <Icon
        on:click="{remove}"
        icon="{MdDeleteForever}"
        class="mr-1 hover:bg-red-600 cursor-pointer"
      />
    {/if}
  </div>
  <input
    on:blur
    on:input
    on:change
    value="{value}"
    {...$$props}
    class="px-2 w-1/2 flex-1 text-dark rounded"
  />
</div>
