<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Input from "@/components/UI/Input.svelte";
  import Notify from "@/components/UI/Notify.svelte";
  import Button from "@/components/UI/Button.svelte";

  export let prefix;

  let value = "";
  let errorMessage = null;

  function setCommand({ detail: event }) {
    value = event.target.value;
  }

  function addCommand() {
    if (!value) return;
    api.addCommand({ name: value }).catch(() => {
      errorMessage = _("sentences.command-name-must-be-unique");
    });
    value = "";
  }

  function onEnterKey(event) {
    setCommand(event);
    addCommand();
  }
</script>

<Notify type="error" bind:message="{errorMessage}" />

<div class="flex items-center">
  <div class="p-2 px-4 bg-gray-600 bg-opacity-25">{prefix}</div>
  <Input
    label="{false}"
    value="{value}"
    rootClass="flex-auto"
    on:input="{setCommand}"
    on:enterKey="{onEnterKey}"
  />
  <Button on:click="{addCommand}" class="bg-white bg-opacity-25">
    {_('words.add')}
  </Button>
</div>
