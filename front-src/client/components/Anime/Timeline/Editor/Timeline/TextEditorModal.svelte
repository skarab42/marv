<script>
  import { _ } from "@/libs/i18next";
  import TagList from "./TagList.svelte";
  import { fetchText } from "../../libs/utils";
  import { createEventDispatcher } from "svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";
  import CodeMirror from "@/components/UI/CodeMirror.svelte";

  export let item;
  export let widget;
  export let opened;

  const dispatch = createEventDispatcher();

  $: title = opened && item.target.filename;

  function codeMirrorUpdate({ detail }) {
    dispatch("textFileChange", { item, text: detail });
  }
</script>

<Modal
  on:close
  title="{title}"
  {...$$restProps}
  opened="{opened}"
  class="container"
>
  <TagList widget="{widget}" />
  <div class="p-5">
    {#await fetchText(item.target.filename)}
      Loading....
    {:then text}
      <CodeMirror code="{text}" on:change="{codeMirrorUpdate}" />
    {/await}
  </div>
  <div class="p-5 pt-0 flex">
    <Button
      on:click="{dispatch.bind(null, 'close')}"
      class="flex-auto justify-center bg-green-600"
    >
      {_('words.close')}
    </Button>
  </div>
</Modal>
