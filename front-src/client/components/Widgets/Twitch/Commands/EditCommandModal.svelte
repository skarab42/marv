<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Modal from "@/components/UI/Modal.svelte";
  import Input from "@/components/UI/Input.svelte";
  import CodeMirror from "@/components/UI/CodeMirror.svelte";

  export let command;
  export let opened = false;

  function updateKey(key, value) {
    command[key] = value.trim();
    api.updateCommand(command);
  }

  function update(key, { target }) {
    updateKey(key, target.value);
  }

  function codeMirrorUpdate({ detail }) {
    updateKey("message", detail);
  }

  $: message = command.message || "";
</script>

<Modal
  on:close
  bind:opened
  class="container"
  title="{_('sentences.command-settings')}"
>
  <div class="flex flex-col p-5 gap-2">
    <Input
      label="{_('words.command')}"
      value="{command.name}"
      on:change="{update.bind(null, 'name')}"
    />
    <Input
      label="{_('words.variables')}"
      value="{command.usage}"
      on:change="{update.bind(null, 'usage')}"
    />
    <Input
      label="{_('words.description')}"
      value="{command.description}"
      on:change="{update.bind(null, 'description')}"
    />
    <Input
      type="number"
      min="{0}"
      label="{_('words.cooldown')}"
      value="{command.cooldown}"
      on:change="{update.bind(null, 'cooldown')}"
    />
    <div
      class="flex items-center gap-2 text-gray-700 uppercase text-xl font-bold"
    >
      <div>{_('words.message')}</div>
      <div class="text-xs">
        (
        <a class="text-pink-600" href="https://ejs.co/#docs" target="_blank">
          {_('sentences.supports-ejs-syntax')}
        </a>
        )
      </div>
    </div>
    <CodeMirror code="{message}" on:change="{codeMirrorUpdate}" />
  </div>
</Modal>
