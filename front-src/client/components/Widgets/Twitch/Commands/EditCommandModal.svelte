<script>
  import api from "@/api/twitch";
  import { onMount } from "svelte";
  import { _ } from "@/libs/i18next";
  import CodeMirror from "codemirror";
  import { debounce } from "throttle-debounce";
  import Modal from "@/components/UI/Modal.svelte";
  import Input from "@/components/UI/Input.svelte";

  import "codemirror/mode/htmlembedded/htmlembedded";
  import "codemirror/lib/codemirror.css";
  import "codemirror/theme/material-palenight.css";

  export let command;
  export let opened = false;

  let codeArea = null;

  function update(key, { target }) {
    command[key] = target.value.trim();
    api.updateCommand(command);
  }

  const updateDebounce = debounce(500, update);

  function codeMirrorInit() {
    const myCodeMirror = CodeMirror.fromTextArea(codeArea, {
      mode: "application/x-ejs",
      lineNumbers: true,
      theme: "material-palenight",
      tabSize: 2,
    });

    myCodeMirror.on("changes", () => {
      const value = myCodeMirror.getValue();
      updateDebounce("message", { target: { value } });
    });
  }

  $: if (codeArea) codeMirrorInit();
  $: message = command.message || "";
</script>

<Modal on:close bind:opened title="{_('sentences.command-settings')}">
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
    <textarea
      class="p-2 text-dark"
      bind:this="{codeArea}"
      on:change="{update.bind(null, 'message')}"
      style="min-width:50vw; min-height:250px"
    >{message}</textarea>
  </div>
</Modal>
