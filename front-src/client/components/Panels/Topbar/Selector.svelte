<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import Button from "./Button.svelte";
  import RenameModal from "./RenameModal.svelte";
  import RemoveModal from "./RemoveModal.svelte";
  import Menu from "@/components/UI/Menu.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import { panels, currentPanel } from "@/stores/panels";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import ContextMenu from "@/components/UI/ContextMenu.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";
  import HorizontalScroller from "@/components/UI/HorizontalScroller.svelte";

  let scroller = null;
  let selectedPanel = null;
  let renameModalOpened = false;
  let removeModalOpened = false;

  api.on("add", (panel, { owner }) => {
    owner && scroller && scroller.scrollRight();
  });

  function onMove({ detail }) {
    const { from, to } = detail;
    if (from === to) return;
    $panels.splice(to, 0, $panels.splice(from, 1)[0]);
    $panels = $panels;
  }

  function openRenameModal(panel) {
    selectedPanel = panel;
    renameModalOpened = true;
  }

  function openRemoveModal(panel) {
    selectedPanel = panel;
    removeModalOpened = true;
  }
</script>

{#if $currentPanel}
  <div class="p-2 flex space-x-2 panels-center bg-dark text-light">
    <HorizontalScroller bind:this="{scroller}" gap="2" arrowClass="bg-dark">
      {#each $panels as panel, index (panel.id)}
        <ContextMenu let:opened>
          <Button
            class="{opened ? 'bg-pink-700' : ''}"
            index="{index}"
            panel="{panel}"
            on:move="{onMove}"
          />
          <div slot="menu">
            <Menu>
              <MenuItem
                icon="{MdEdit}"
                on:click="{openRenameModal.bind(null, panel)}"
              >
                {_('words.rename')}
              </MenuItem>
              <MenuItem
                icon="{MdDeleteForever}"
                on:click="{openRemoveModal.bind(null, panel)}"
              >
                {_('words.remove')}
              </MenuItem>
            </Menu>
          </div>
        </ContextMenu>
      {/each}
    </HorizontalScroller>
  </div>
{/if}

<RenameModal panel="{selectedPanel}" bind:opened="{renameModalOpened}" />
<RemoveModal panel="{selectedPanel}" bind:opened="{removeModalOpened}" />
