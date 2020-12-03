<script>
  import { _ } from "@/libs/i18next";
  import { fetchText } from "../../libs/utils";
  import { createEventDispatcher } from "svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";

  export let item;

  let text = `${_("words.loading")}...`;

  const dispatch = createEventDispatcher();

  fetchText(item.target.filename).then((txt) => (text = txt));

  function onChange({ target }) {
    dispatch("textFileChange", { item, text: target.value });
  }

  function close() {
    dispatch("close");
  }
</script>

<Modal closable="{true}" on:close="{close}">
  <div class="bg-dark text-light rounded">
    <div class="px-5 py-2 font-bold bg-primary rounded-t">
      {item.target.filename}
    </div>
    <div class="p-5">
      <textarea
        class="text-dark"
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
