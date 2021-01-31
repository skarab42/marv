<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import { fetchText } from "../../libs/utils";
  import { createEventDispatcher } from "svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";

  export let item;
  export let widget;
  export let opened;

  let tags = [];
  let text = `${_("words.loading")}...`;
  let textarea;

  api.getEventNames().then((names) => {
    const arr = names.find((event) => event.name === widget.eventName);
    tags = arr ? arr.tags : [];
  });

  const dispatch = createEventDispatcher();

  $: title = opened && item.target.filename;
  $: opened && fetchText(item.target.filename).then((txt) => (text = txt));

  function onChange({ target }) {
    dispatch("textFileChange", { item, text: target.value });
  }

  function insertTag(tag) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    textarea.setRangeText(`$${tag}`, start, end, "select");
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
    <textarea
      bind:this="{textarea}"
      class="p-2 text-dark"
      on:change="{onChange}"
      style="min-width:50vw; min-height:250px"
    >{text}</textarea>
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
