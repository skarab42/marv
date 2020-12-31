<script>
  import api from "@/api/app";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/app";
  import { getLastRelease } from "@/libs/app";
  import Modal from "@/components/UI/Modal.svelte";
  import Checkbox from "@/components/UI/Checkbox.svelte";

  let showModal = $store.showFirstStartInfo;
  $: checked = !$store.showFirstStartInfo;
  $: overlayURL = `http://${$store.server.host}:${$store.server.port}/overlay`;

  const repo = "palakis/obs-websocket";

  async function getURL() {
    return (await getLastRelease(repo)).url;
  }

  function onCheckboxChange() {
    $store.showFirstStartInfo = !$store.showFirstStartInfo;
    api.setSetting("showFirstStartInfo", $store.showFirstStartInfo);
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

      <div class="m-2 bg-gray-400">
        <div class="p-2 font-bold">{_('obs.overlay-install-sentence')}</div>
        <div class="p-2 flex justify-center">
          <div class="px-2 bg-gray-100 rounded">{overlayURL}</div>
        </div>
        <div class="px-2">- {_('obs.check-disable-source-not-visible')}</div>
        <div class="px-2">- {_('obs.check-refresh-browser-on-activate')}</div>
      </div>

      <div class="m-2 bg-gray-400">
        <div class="p-2 font-bold">{_('obs.first-start-install-sentence')}</div>
        <div class="p-2 flex justify-center">
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
