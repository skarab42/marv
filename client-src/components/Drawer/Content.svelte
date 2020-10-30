<script>
  import { _ } from "@/api/i18n";
  // import LanguageSelect from "./LanguageSelect.svelte";

  let position = "absolute z-50 top-0 right-0 bottom-0 ml-8";
  let colors = "bg-gray-800 text-dark";
  let extra = "overflow-auto shadow";
</script>

<div class="{position} {colors} {extra}">
  <div class="flex flex-col">
    <span class="px-4 py-2 bg-blue-700 capitalize">{_("words.settings")}</span>
    <span class="px-4 py-2">Action 1</span>
    <span class="px-4 py-2">Action 2</span>
    <span class="px-4 py-2">Action 3</span>
    <!-- <DarkModeSwitch class="p-4" />
    <LanguageSelect class="mx-4 p-2 text-dark" /> -->
  </div>
</div>
