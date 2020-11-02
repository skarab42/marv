<script>
  import { toggle } from "@/stores/dashboard/drawer";
  import MdMenu from "svelte-icons/md/MdMenu.svelte";
  import Icon from "@/components/UI/Icon.svelte";
</script>

<div
  on:click|stopPropagation="{toggle}"
  class="p-2 bg-primary hover:bg-secondary cursor-pointer"
>
  <Icon icon="{MdMenu}" />
</div>
