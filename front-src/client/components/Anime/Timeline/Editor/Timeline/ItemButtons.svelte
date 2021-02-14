<script>
  import { _ } from "@/libs/i18next";
  import Icon from "@/components/UI/Icon.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import TextEditorModal from "./TextEditorModal.svelte";
  import { getContext, createEventDispatcher } from "svelte";
  import MdFileUpload from "svelte-icons/md/MdFileUpload.svelte";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";
  import MdContentCopy from "svelte-icons/md/MdContentCopy.svelte";
  import FileManagerModal from "@/components/FileManager/Modal.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let item;
  export let widget;

  const dispatch = createEventDispatcher();
  const { items, selectedItem, selectedKeyframe } = getContext("Editor");

  const accept = ["image", "audio", "text", "video", "font"];

  let showFileManager = false;
  let confirmRemoveModal = false;
  let showTextEditorModal = false;

  function selectItem(item) {
    if (!$selectedItem || $selectedItem.id !== item.id) {
      $selectedKeyframe = null;
      $selectedItem = item;
    }
  }

  function openTextEditorModal(item) {
    selectItem(item);
    showTextEditorModal = true;
  }

  function closeTextEditorModal() {
    showTextEditorModal = false;
    $items = $items;
  }

  function openFileManager(item) {
    selectItem(item);
    showFileManager = true;
  }

  function closeFileManager() {
    showFileManager = false;
  }

  function onFileSelect({ detail: file }) {
    dispatch("fileUpdate", { item: $selectedItem, file });
    closeFileManager();
  }

  function onRemoveItem(item) {
    selectItem(item);
    confirmRemoveModal = true;
  }

  function remove() {
    $selectedItem = null;
    $items = $items.filter(({ id }) => id !== item.id);
    dispatch("remove", item);
  }

  function onConfirmRemove({ detail: confirm }) {
    confirmRemoveModal = false;
    confirm && remove();
  }

  function duplicateItem(item) {
    dispatch("duplicate", item);
  }
</script>

{#if item.target.type === 'text'}
  <div
    class="p-2 cursor-pointer hover:bg-secondary"
    on:click="{openTextEditorModal.bind(null, item)}"
  >
    <Icon icon="{MdEdit}" />
  </div>
{/if}

<div
  class="p-2 cursor-pointer hover:bg-secondary"
  on:click="{duplicateItem.bind(null, item)}"
>
  <Icon icon="{MdContentCopy}" />
</div>

<div
  class="p-2 cursor-pointer hover:bg-secondary"
  on:click="{openFileManager.bind(null, item)}"
>
  <Icon icon="{MdFileUpload}" />
</div>

<div
  class="p-2 cursor-pointer hover:bg-red-600"
  on:click="{onRemoveItem.bind(null, item)}"
>
  <Icon icon="{MdDeleteForever}" />
</div>

<TextEditorModal
  widget="{widget}"
  item="{$selectedItem}"
  bind:opened="{showTextEditorModal}"
  on:close="{closeTextEditorModal}"
  on:textFileChange
/>

<FileManagerModal
  accept="{accept}"
  on:select="{onFileSelect}"
  on:close="{closeFileManager}"
  bind:opened="{showFileManager}"
/>

<ConfirmModal
  question="{_('sentences.ask-remove-asset', {
    filename: $selectedItem && $selectedItem.target.filename,
  })}"
  bind:opened="{confirmRemoveModal}"
  on:confirm="{onConfirmRemove}"
/>
