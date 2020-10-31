<script>
import { _, i18next, changeLanguage } from "@/api/i18n";
import Select from "@/components/UI/Select.svelte";
import Button from "@/components/UI/Button.svelte";
import Modal from "@/components/UI/Modal.svelte";

let modal = false;
let language = i18next.language;
let languages = i18next.options.preload;

function openModal() {
  modal = true;
}

function closeModal() {
  modal = false;
}

function reload() {
  closeModal();
  location.reload();
}

function onChange({ detail }) {
  language = detail;
  changeLanguage(language);
  openModal();
}
</script>

<Select
  {...$$restProps}
  value={language}
  items={languages}
  on:change={onChange}
/>

{#if modal}
<Modal class="bg-gray-200 text-gray-800 rounded">
  <div class="p-2 font-bold">
    {_("app.ask-for-client-reload")}
  </div>
  <div class="flex p-2 space-x-2">
    <Button class="bg-purple-600" on:click={reload}>
      {_("words.yes")}
    </Button>
    <Button class="bg-gray-500" on:click={closeModal}>
      {_("words.no")}
    </Button>
  </div>
</Modal>
{/if}
