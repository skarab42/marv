<script>
  import { toggle } from "@/stores/drawer";
  import MdMenu from "svelte-icons/md/MdMenu.svelte";
  import Icon from "@/components/UI/Icon.svelte";

  export let bgColor = "bg-primary";
</script>

<div
  on:click|stopPropagation="{toggle}"
  class="p-2 {bgColor} hover:bg-secondary cursor-pointer"
>
  <Icon icon="{MdMenu}" />
</div>
