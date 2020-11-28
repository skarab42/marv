<script>
  import { stream } from "@/stores/twitch";
  import Icon from "@/components/UI/Icon.svelte";
  import MdVisibility from "svelte-icons/md/MdVisibility.svelte";

  let badge = "flex space-x-2 px-2 bg-primary-dark text-light-darker rounded";
</script>

<div class="flex p-2 pl-0 space-x-2">
  {#if $stream}
    <div class="{badge}">
      <Icon icon="{MdVisibility}" />
      <span> {$stream.viewer_count}</span>
    </div>
  {/if}
</div>
