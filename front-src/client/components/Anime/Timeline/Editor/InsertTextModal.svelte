<script>
  import { _ } from "@/libs/i18next";
  import { createEventDispatcher } from "svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import Input from "@/components/UI/Input.svelte";
  import Button from "@/components/UI/Button.svelte";

  const dispatch = createEventDispatcher();

  let value = "";
  let title = _("sentences.insert-text-file");

  function insertText() {
    dispatch("save", value);
  }

  function closeModal() {
    dispatch("close");
  }

  function onUpdate({ detail }) {
    value = detail;
  }
</script>

<Modal closable="{true}" on:close>
  <div class="bg-dark text-light rounded">
    <div class="px-5 py-2 font-bold bg-primary rounded-t">{title}</div>
    <div class="p-5">
      <Input label="{_('words.filename')}" on:update="{onUpdate}" />
    </div>
    <div class="p-5 pt-0 flex space-x-2">
      <Button
        on:click="{insertText}"
        class="flex-auto justify-center bg-green-600"
      >
        {_('words.save')}
      </Button>
      <Button
        on:click="{closeModal}"
        class="flex-auto justify-center bg-red-600"
      >
        {_('words.cancel')}
      </Button>
    </div>
  </div>
</Modal>
