<script>
  import Icon from "@/components/UI/Icon.svelte";
  import MdCheck from "svelte-icons/md/MdCheck.svelte";
  import MdError from "svelte-icons/md/MdError.svelte";

  export let label;
  export let status;

  $: statusIcon = status.connected ? MdCheck : MdError;
  $: statusColor = status.connected ? "text-green-600" : "text-red-600";
</script>

<div class="px-2 flex gap-2 {statusColor}">
  <span class="flex-auto">{label}</span>
  <Icon icon="{statusIcon}" />
</div>
