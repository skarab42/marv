<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Input from "@/components/UI/Input.svelte";
  import Button from "@/components/UI/Button.svelte";

  export let prefix;

  let value = "";

  function setCommand({ detail: event }) {
    value = event.target.value;
  }

  function addCommand() {
    if (!value) return;
    api.addCommand({ name: value });
    value = "";
  }

  function onEnterKey(event) {
    setCommand(event);
    addCommand();
  }
</script>

<div class="flex items-center">
  <div class="p-2 px-4 bg-light bg-opacity-25">{prefix}</div>
  <Input
    label="{false}"
    value="{value}"
    rootClass="flex-auto"
    on:input="{setCommand}"
    on:enterKey="{onEnterKey}"
  />
  <Button on:click="{addCommand}" class="bg-primary">{_('words.add')}</Button>
</div>
