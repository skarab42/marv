<script>
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import Icon from "@/components/UI/Icon.svelte";

  export let visible;
</script>

<Icon
  class="cursor-pointer {visible ? 'opacity-25' : 'opacity-0'} hover:opacity-100"
  icon="{MdClose}"
  on:click
/>
