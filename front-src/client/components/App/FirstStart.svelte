<script>
  import api from "@/api/app";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/app";
  import getLastRelease from "./getLastRelease";
  import Modal from "@/components/UI/Modal.svelte";
  import Checkbox from "@/components/UI/Checkbox.svelte";

  let showModal = $store.showFirstStartInfo;
  $: checked = !$store.showFirstStartInfo;

  const repo = "palakis/obs-websocket";

  async function getURL() {
    return (await getLastRelease(repo)).url;
  }

  function onCheckboxChange() {
    $store.showFirstStartInfo = !$store.showFirstStartInfo;
    api.set("showFirstStartInfo", $store.showFirstStartInfo);
  }

  function closeModal() {
    showModal = false;
  }
</script>

{#if showModal}
  <Modal closable on:close="{closeModal}">
    <div class="flex flex-col bg-light text-dark rounded">
      <div class="p-5 pr-10 font-bold bg-primary-dark text-light rounded-t">
        {_('sentences.first-start-title')}
      </div>
      <div class="p-5">{_('obs.first-start-install-sentence')}</div>
      <div class="p-5 flex justify-center">
        {#await getURL()}
          {_('words.loading')}...
        {:then url}
          <a
            href="{url}"
            class="p-2 bg-secondary text-light font-bold rounded uppercase"
          >{_('words.download')}</a>
        {:catch error}
          {_('words.error')}:
          {error.message}
        {/await}
      </div>
      <div class="p-5">
        <Checkbox
          checked="{checked}"
          on:change="{onCheckboxChange}"
          label="{_('sentences.dont-ask-me-again')}"
        />
      </div>
    </div>
  </Modal>
{/if}
