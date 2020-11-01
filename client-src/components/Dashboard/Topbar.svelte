<script>
  import MdMenu from "svelte-icons/md/MdMenu.svelte";
  import Drawer from "@/components/App/Drawer.svelte";
  import OBSTopbar from "@/components/OBS/Topbar.svelte";
</script>

<div class="flex flex-col">
  <div class="flex items-center bg-purple-800 text-light">
    <OBSTopbar />
    <Drawer />
  </div>
</div>
