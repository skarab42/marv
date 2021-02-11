<script>
  import JSZip from "jszip";
  import { importArchive } from "@/libs/panels";
  import Menu from "@/components/UI/Menu.svelte";
  import ContextMenu from "@/components/UI/ContextMenu.svelte";
  import EditGridItem from "./ContextMenu/EditGridItem.svelte";
  import AddPanelItem from "./ContextMenu/AddPanelItem.svelte";
  import AddWidgetItem from "./ContextMenu/AddWidgetItem.svelte";
  import { currentPanel, findSpaceForWidget } from "@/stores/panels";
  import ImportWidgetItem from "./ContextMenu/ImportWidgetItem.svelte";

  let importInput = null;

  function onImport() {
    importInput.click();
  }

  async function onImportFile({ target }) {
    const jszip = new JSZip();
    const file = target.files[0];
    const zip = await jszip.loadAsync(file);
    const store = await zip.file("store.json").async("string");
    const { bbox } = JSON.parse(store);
    const position = findSpaceForWidget($currentPanel, bbox);

    await importArchive($currentPanel, {
      filename: file.name,
      buffer: file,
      position,
    });

    importInput.value = null;
  }
</script>

<ContextMenu
  on:open
  on:close
  let:opened
  {...$$restProps}
  class="flex flex-col h-full"
>
  <slot opened="{opened}" />
  <div slot="menu">
    <Menu>
      <slot name="items" />
      <EditGridItem />
      <AddPanelItem />
      <AddWidgetItem />
      <ImportWidgetItem on:click="{onImport}" />
    </Menu>
  </div>
</ContextMenu>

<input
  type="file"
  class="hidden"
  accept=".marv-widget"
  bind:this="{importInput}"
  on:change="{onImportFile}"
/>
