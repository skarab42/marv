<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import Modal from "@/components/UI/Modal.svelte";
  import Input from "@/components/UI/Input.svelte";
  import Button from "@/components/UI/Button.svelte";

  export let opened = false;
  export let panel = false;

  function onUpdate({ detail }) {
    api.update({ ...panel, name: detail });
  }

  function close() {
    opened = false;
  }
</script>

<Modal bind:opened title="{_('words.rename')}">
  <div class="flex flex-col p-5 gap-5">
    <Input value="{panel.name}" on:update="{onUpdate}" on:enterKey="{close}" />
    <Button class="flex bg-green-600" on:click="{close}">
      {_('words.done')}
    </Button>
  </div>
</Modal>
