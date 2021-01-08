<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import { fetchText } from "../../libs/utils";
  import { createEventDispatcher } from "svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";

  export let item;
  export let widget;

  let tags = [];
  let text = `${_("words.loading")}...`;
  let textarea;

  api.getEventNames().then((names) => {
    const arr = names.find((event) => event.name === widget.eventName);
    tags = arr ? arr.tags : [];
  });

  const dispatch = createEventDispatcher();

  fetchText(item.target.filename).then((txt) => (text = txt));

  function onChange({ target }) {
    dispatch("textFileChange", { item, text: target.value });
  }

  function close() {
    dispatch("close");
  }

  function insertTag(tag) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    textarea.setRangeText(`$${tag}`, start, end, "select");
  }
</script>

<Modal closable="{true}" on:close="{close}">
  <div class="bg-dark text-light rounded">
    <div class="px-5 py-2 font-bold bg-primary rounded-t">
      {item.target.filename}
    </div>
    <div class="pt-5 px-5 flex space-x-2">
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
      <Button on:click="{close}" class="flex-auto justify-center bg-green-600">
        {_('words.done')}
      </Button>
    </div>
  </div>
</Modal>
