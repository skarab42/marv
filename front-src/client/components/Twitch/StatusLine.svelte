<script>
  import { _ } from "@/libs/i18next";
  import Icon from "@/components/UI/Icon.svelte";
  import MdCheck from "svelte-icons/md/MdCheck.svelte";
  import MdError from "svelte-icons/md/MdError.svelte";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";

  export let label;
  export let status;

  $: statusColor = status.connected ? "text-green-600" : "text-red-600";
</script>

<div class="px-2 flex items-center gap-2 {statusColor}">
  {#if status.connected}
    <div class="flex-auto">{label}</div>
    <Icon icon="{MdCheck}" />
  {:else if status.connecting}
    <div class="flex-auto">{label}</div>
    <Icon class="animate-spin" icon="{MdRefresh}" />
  {:else}
    <div on:click class="flex-auto cursor-pointer hover:text-secondary">
      {label}
      {_('words.connect')}
    </div>
    <Icon icon="{MdError}" />
  {/if}
</div>
