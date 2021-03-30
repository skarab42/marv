<script>
  import api from "@/api/obs";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/obs";
  import Input from "@/components/UI/Input.svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";

  let opened = false;
  let title = _("sentences.obs-settings");

  function openModal() {
    opened = true;
  }

  function closeModal() {
    opened = false;
  }

  function save() {
    api.setSetting("port", $store.port);
    api.setSetting("password", $store.password);
    closeModal();
  }

  function update(key, { target }) {
    $store[key] = target.value;
  }
</script>

<Button class="bg-secondary" on:click="{openModal}">{title}</Button>

<Modal on:close title="{title}" opened="{opened}">
  <div class="p-5">
    <Input
      value="{$store.port}"
      label="{_('words.port')}"
      on:change="{update.bind(null, 'port')}"
    />
    <Input
      type="password"
      value="{$store.password}"
      label="{_('words.password')}"
      on:change="{update.bind(null, 'password')}"
    />
  </div>

  <div class="p-5 pt-0 flex space-x-2">
    <Button on:click="{save}" class="flex-auto justify-center bg-green-600">
      {_('words.save')}
    </Button>
    <Button on:click="{closeModal}" class="flex-auto justify-center bg-red-600">
      {_('words.cancel')}
    </Button>
  </div>
</Modal>
