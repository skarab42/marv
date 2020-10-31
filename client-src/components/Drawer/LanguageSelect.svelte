<script>
import { i18next, changeLanguage } from "@/api/i18n";
import Select from "@/components/UI/Select.svelte";

let language = i18next.language;
let languages = i18next.options.preload;

function onChange({ detail }) {
  language = detail;
  changeLanguage(language);
}
</script>

<Select
  {...$$restProps}
  value={language}
  items={languages}
  on:change={onChange}
/>
