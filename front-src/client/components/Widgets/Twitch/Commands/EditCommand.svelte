<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Modal from "@/components/UI/Modal.svelte";
  import Input from "@/components/UI/Input.svelte";

  export let command;

  function update(key, { target }) {
    command[key] = target.value.trim();
    api.updateCommand(command);
  }
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
      <div class="p-2 text-gray-700 uppercase text-xl font-bold">
        {_('words.message')}
      </div>
      <textarea
        class="p-2 text-dark"
        on:change="{update.bind(null, 'message')}"
        style="min-width:50vw; min-height:250px"
      >{command.message || ''}</textarea>
    </div>
  </div>
</Modal>
