<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import Modal from "./Modal.svelte";
  import Input from "@/components/UI/Input.svelte";
  import Button from "@/components/UI/Button.svelte";

  export let opened = false;
  export let panel = false;

  function onUpdate({ detail }) {
    api.update({ ...panel, name: detail });
  }

  function onClose() {
    opened = false;
  }
</script>

{#if opened}
  <Modal title="{_('words.rename')}" closable="{true}" on:close="{onClose}">
    <div class="flex flex-col gap-2">
      <Input
        value="{panel.name}"
        on:update="{onUpdate}"
        on:enterKey="{onClose}"
      />
      <Button class="flex bg-green-600" on:click="{onClose}">
        {_('words.done')}
      </Button>
    </div>
  </Modal>
{/if}
