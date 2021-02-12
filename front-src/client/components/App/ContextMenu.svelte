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

  async function importFile(file) {
    const jszip = new JSZip();
    const zip = await jszip.loadAsync(file);
    const store = await zip.file("store.json").async("string");
    const { bbox } = JSON.parse(store);
    const position = findSpaceForWidget($currentPanel, bbox);

    const result = await importArchive($currentPanel, {
      filename: file.name,
      buffer: file,
      position,
    });

    result.error && console.log("ERROR >>>", result);
  }

  async function onImportFiles({ target }) {
    const files = [...target.files];
    for (let i = 0, l = files.length; i < l; i++) {
      await importFile(files[i]);
    }
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
  multiple="{true}"
  bind:this="{importInput}"
  on:change="{onImportFiles}"
  accept=".marv-widget,.marv-panel"
/>
