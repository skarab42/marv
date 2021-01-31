<script>
  import { _, i18next } from "@/libs/i18next";
  import { getLastRelease } from "@/libs/app";
  import { version } from "../../../../package";
  import compareVersions from "compare-versions";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";
  import { store, siteURL, repo } from "@/stores/app";
  import CheckUpdateCheckbox from "./CheckUpdateCheckbox.svelte";

  const downloadURL = `${$siteURL}/${i18next.language}/download`;

  let opened = false;
  let newRelease = null;

  async function checkUpdate() {
    newRelease = await getLastRelease($repo);
    opened = compareVersions.compare(newRelease.version, version, ">");
  }

  function download() {
    opened = false;
    window.open(downloadURL);
  }

  if ($store.checkUpdateAtStartup) {
    checkUpdate();
  }
</script>

<Modal bind:opened title="{_('sentences.new-version-available')}">
  <div class="flex justify-center p-5">
    <Button class="flex-auto bg-secondary" on:click="{download}">
      {_('words.download')}
      {newRelease.version}
    </Button>
  </div>
  <div class="p-5 pt-0">
    <CheckUpdateCheckbox />
  </div>
</Modal>
