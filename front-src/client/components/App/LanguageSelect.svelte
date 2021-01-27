<script>
  import { _ } from "@/libs/i18next";
  import { store, changeLanguage } from "@/stores/i18next";

  import Select from "@/components/UI/Select.svelte";
  import MdLanguage from "svelte-icons/md/MdLanguage.svelte";

  async function onChange({ detail }) {
    await changeLanguage(detail);
    location.reload();
  }
</script>

<div class="flex items-center">
  <div class="ml-2 w-6 h-6">
    <MdLanguage />
  </div>
  <div class="p-2 uppercase flex-auto">{_('words.language')}</div>
  <Select
    class="flex-auto"
    value="{$store.lng}"
    items="{$store.supportedLngs}"
    on:change="{onChange}"
  />
</div>
