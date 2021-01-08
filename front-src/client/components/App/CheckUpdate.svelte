<script>
  import api from "@/api/app";
  import { _, i18next } from "@/libs/i18next";
  import { getLastRelease } from "@/libs/app";
  import { version } from "../../../../package";
  import compareVersions from "compare-versions";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";
  import { store, siteURL, repo } from "@/stores/app";
  import CheckUpdateCheckbox from "./CheckUpdateCheckbox.svelte";

  const downloadURL = `${$siteURL}/${i18next.language}/download`;

  let downloded = false;
  let newRelease = null;
  let hasNewVersion = false;

  async function checkUpdate() {
    newRelease = await getLastRelease($repo);
    hasNewVersion = compareVersions.compare(newRelease.version, version, ">");
  }

  function closeModal() {
    hasNewVersion = false;
  }

  function download() {
    downloded = true;
    window.open(downloadURL);
    setTimeout(closeApp, 1000);
  }

  function closeApp() {
    api.quit();
  }

  if ($store.checkUpdateAtStartup) {
    checkUpdate();
  }
</script>

{#if hasNewVersion}
  <Modal closable on:close="{closeModal}">
    <div class="flex flex-col bg-light text-dark rounded">
      <div class="p-5 pr-10 font-bold bg-primary-dark text-light rounded-t">
        {_('sentences.new-version-available')}
      </div>
      {#if downloded}
        <div
          class="flex space-x-2 justify-center p-5 bg-orange-500 text-light font-bold"
        >
          <span class="uppercase">{_('words.warning')}</span>
          <span>{_('sentences.close-marv-before-update')}</span>
        </div>
        <div class="flex justify-center p-5">
          <Button class="bg-red-600" on:click="{closeApp}">
            {_('sentences.close-app')}
          </Button>
        </div>
      {:else}
        <div class="flex justify-center p-5">
          <Button class="bg-secondary" on:click="{download}">
            {_('words.download')}
            {newRelease.version}
          </Button>
        </div>
      {/if}
      <div class="p-5">
        <CheckUpdateCheckbox />
      </div>
    </div>
  </Modal>
{/if}
