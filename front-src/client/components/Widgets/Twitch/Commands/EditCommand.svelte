<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Modal from "@/components/UI/Modal.svelte";
  import Input from "@/components/UI/Input.svelte";
  import { debounce } from "throttle-debounce";
  import CodeMirror from "codemirror";
  import { onMount } from "svelte";

  import "codemirror/mode/htmlembedded/htmlembedded";
  import "codemirror/lib/codemirror.css";
  import "codemirror/theme/material-palenight.css";

  export let command;

  let codeArea = null;

  function update(key, { target }) {
    command[key] = target.value.trim();
    api.updateCommand(command);
  }

  const updateDebounce = debounce(500, update);

  onMount(() => {
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
  });

  $: message = command.message || "";
</script>

<Modal closable="{true}" on:close>
  <div class="bg-dark text-light rounded">
    <div class="px-5 py-2 font-bold bg-primary rounded-t">Command settings</div>
    <div class="px-5 pt-2 pb-5 flex flex-col space-y-2">
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
        class="p-2 flex items-center gap-2 text-gray-700 uppercase text-xl font-bold"
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
  </div>
</Modal>
