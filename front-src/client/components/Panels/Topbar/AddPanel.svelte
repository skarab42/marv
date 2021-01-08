<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import { panels } from "@/stores/panels";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import Tippy from "@/components/UI/Tippy.svelte";
  import Button from "@/components/UI/Button.svelte";

  const clickAddPanel = _("sentences.click-to-add-panel");
  const tippy = { placement: "bottom", showOnCreate: true };

  $: addTippy = { ...tippy, content: clickAddPanel };
</script>

<Tippy options="{addTippy}" disabled="{$panels.length}">
  <Button padding="p-2" icon="{MdAdd}" on:click="{api.add}" class="bg-primary">
    <span
      class="hidden md:inline md:ml-2 truncate"
    >{_('sentences.add-panel')}</span>
  </Button>
</Tippy>
