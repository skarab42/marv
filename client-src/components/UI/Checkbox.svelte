<script>
  import Input from "@/components/UI/Input.svelte";
  import MdCheckBox from "svelte-icons/md/MdCheckBox.svelte";
  import MdCheckBoxOutlineBlank from "svelte-icons/md/MdCheckBoxOutlineBlank.svelte";

  export let label = null;
  export let checked = false;

  $: icon = checked ? MdCheckBox : MdCheckBoxOutlineBlank;
  $: bgColor = checked ? "bg-green-600" : "bg-primary";
</script>

<Input
  on:change
  icon="{icon}"
  label="{label}"
  type="checkbox"
  bgColor="{bgColor}"
  checked="{checked}"
  labelClass="p-2 cursor-pointer"
/>
