<script>
  import Openable from "@/components/UI/Openable.svelte";
  import Content from "@/components/Drawer/Content.svelte";
  import MdMenu from "svelte-icons/md/MdMenu.svelte";
  import Icon from "@/components/UI/Icon.svelte";
</script>

<Openable>
  <div class="p-2 hover:bg-blue-600 cursor-pointer">
    <Icon icon={MdMenu} />
  </div>
  <div slot="open" on:click|stopPropagation>
    <Content />
  </div>
</Openable>
