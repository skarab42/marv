<script>
  import axios from "axios";
  import api from "@/api/app";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/app";
  import Modal from "@/components/UI/Modal.svelte";
  import Checkbox from "@/components/UI/Checkbox.svelte";
  import Dashboard from "@/components/Dashboard/Main.svelte";

  let showModal = $store.showFirstStartInfo;

  $: checked = $store.showFirstStartInfo;

  const url =
    "https://api.github.com/repos/palakis/obs-websocket/releases/latest";

  const extsToOS = {
    deb: "linux",
    exe: "win32",
    pkg: "darwin",
  };

  function getURL() {
    return axios.get(url).then(async (res) => {
      const exts = {};

      res.data.assets.forEach((asset) => {
        const url = asset.browser_download_url;
        const ext = url.split(".").pop();
        exts[extsToOS[ext]] = url;
      });

      return exts[await api.getOS()];
    });
  }

  function onCheckboxChange() {
    $store.showFirstStartInfo = !$store.showFirstStartInfo;
    api.set("showFirstStartInfo", $store.showFirstStartInfo);
  }

  function closeModal() {
    showModal = false;
  }
</script>

<Dashboard />

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
