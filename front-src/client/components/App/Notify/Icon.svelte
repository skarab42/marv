<script>
  import { iconColor } from "./colors";
  import Icon from "@/components/UI/Icon.svelte";
  import info from "svelte-icons/md/MdInfo.svelte";
  import error from "svelte-icons/md/MdError.svelte";
  import warning from "svelte-icons/md/MdWarning.svelte";
  import success from "svelte-icons/md/MdCheckCircle.svelte";

  export let type;

  const icons = {
    info,
    error,
    warning,
    success,
  };

  let icon = icons[type] || icons.info;
</script>

<Icon icon="{icon}" class="{iconColor(type)}" />
