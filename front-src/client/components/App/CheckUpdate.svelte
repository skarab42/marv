<script>
  import api from "@/api/app";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/app";
  import { version } from "../../../../package";
  import getLastRelease from "./getLastRelease";
  import compareVersions from "compare-versions";
  import Modal from "@/components/UI/Modal.svelte";
  import CheckUpdateCheckbox from "./CheckUpdateCheckbox.svelte";

  const repo = "skarab42/marv";

  let newRelease = null;
  let hasNewVersion = false;

  async function checkUpdate() {
    newRelease = await getLastRelease(repo);
    hasNewVersion = !compareVersions.compare(newRelease.version, version, ">");
  }

  function closeModal() {
    hasNewVersion = false;
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
      <div class="flex justify-center p-5">
        <a
          href="{newRelease.url}"
          class="p-2 bg-secondary text-light font-bold rounded uppercase"
        >{_('words.download')}
          {newRelease.version}</a>
      </div>
      <div class="p-5">
        <CheckUpdateCheckbox />
      </div>
    </div>
  </Modal>
{/if}
