<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import { fetchText } from "../../libs/utils";
  import { createEventDispatcher } from "svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";
  import CodeMirror from "@/components/UI/CodeMirror.svelte";

  export let item;
  export let widget;
  export let opened;

  let tags = [];
  let textarea;

  api.getEventNames().then((names) => {
    const arr = names.find((event) => event.name === widget.eventName);
    tags = arr ? arr.tags : [];
  });

  const dispatch = createEventDispatcher();

  $: title = opened && item.target.filename;

  function insertTag(tag) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    textarea.setRangeText(`$${tag}`, start, end, "select");
  }

  function codeMirrorUpdate({ detail }) {
    dispatch("textFileChange", { item, text: detail });
  }
</script>

<Modal on:close opened="{opened}" {...$$restProps} title="{title}">
  <div class="pt-5 px-5 flex gap-2">
    {#each tags as tag}
      <div
        on:click="{insertTag.bind(null, tag)}"
        class="px-2 bg-gray-900 rounded cursor-pointer"
      >
        ${tag}
      </div>
    {/each}
  </div>
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
