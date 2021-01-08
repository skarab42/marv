<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

  export let title = "File manager";

  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col h-full bg-dark">
  <div class="p-2 flex font-bold bg-primary-darker rounded-t">
    <div class="flex-auto">{title}</div>
    <div class="cursor-pointer" on:click="{dispatch.bind(null, 'close')}">
      <Icon icon="{MdClose}" />
    </div>
  </div>
  <slot name="topbar" />
  <div class="overflow-auto h-full">
    <slot />
  </div>
</div>
