<script>
  import { fetchText } from "../../libs/utils";
  import { createEventDispatcher } from "svelte";
  import Modal from "@/components/UI/Modal.svelte";

  export let item;

  let text = "Loading text...";

  const dispatch = createEventDispatcher();

  fetchText(item.target.filename).then((txt) => (text = txt));

  function onChange({ target }) {
    dispatch("textFileChange", { item, text: target.value });
  }
</script>

<Modal closable="{true}" on:close>
  <div class="bg-dark text-light rounded">
    <div class="p-5 font-bold">{item.target.filename}</div>
    <div class="p-5">
      <textarea
        class="text-dark"
        on:change="{onChange}"
        style="min-width:50vw; min-height:250px"
      >{text}</textarea>
    </div>
  </div>
</Modal>
