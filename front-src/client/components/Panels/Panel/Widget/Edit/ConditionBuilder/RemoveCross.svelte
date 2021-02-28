<script>
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";
  import Icon from "@/components/UI/Icon.svelte";

  export let visible;
</script>

<Icon
  class="cursor-pointer text-light {visible ? 'opacity-25' : 'opacity-0'} hover:text-red-600 hover:opacity-100"
  icon="{MdDeleteForever}"
  on:click
/>
