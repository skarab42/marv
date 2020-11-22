<script>
  import app from "@/api/app";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/app";
  import Input from "@/components/UI/Input.svelte";
  import MdCheckBox from "svelte-icons/md/MdCheckBox.svelte";
  import MdCheckBoxOutlineBlank from "svelte-icons/md/MdCheckBoxOutlineBlank.svelte";

  let checked = $store.openOnStartup;

  $: bgColor = checked ? "bg-green-600" : "bg-primary";
  $: icon = checked ? MdCheckBox : MdCheckBoxOutlineBlank;

  function onChange(event) {
    checked = event.target.checked;
    app.set("openOnStartup", checked);
  }
</script>

<Input
  icon="{icon}"
  type="checkbox"
  bgColor="{bgColor}"
  checked="{checked}"
  on:change="{onChange}"
  labelClass="p-2 cursor-pointer"
  label="{_('sentences.electron-open-on-startup')}"
/>
