<script>
  import ms from "ms";
  import NoticeIcon from "./Icon.svelte";
  import { slide } from "svelte/transition";
  import { closeNotice } from "@/stores/notify";
  import Icon from "@/components/UI/Icon.svelte";
  import MdCheck from "svelte-icons/md/MdCheck.svelte";

  export let notice;
  export let time = Date.now();
</script>

<div
  transition:slide|local
  on:mouseenter="{() => closeNotice(notice)}"
  class="flex p-2 gap-2 items-center text-gray-800 bg-gray-300 border-b border-gray-600 hover:bg-opacity-100 {notice.read ? 'bg-opacity-75' : ''}"
>
  <NoticeIcon type="{notice.type}" />
  <div class="flex-auto break-all">{notice.message}</div>
  {#if notice.read}
    <div class="fill-current ">
      <Icon icon="{MdCheck}" />
    </div>
  {/if}
  <div class="opacity-50">{ms(time - notice.time)}</div>
</div>
