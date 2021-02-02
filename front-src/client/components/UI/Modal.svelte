<script>
  import Icon from "./Icon.svelte";
  import { createEventDispatcher } from "svelte";
  import Overlay from "@/components/UI/Overlay.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

  const dispatch = createEventDispatcher();

  export let title = null;
  export let opened = false;
  export let minWidth = 300;
  export let closeCross = true;
  export let closeOnBlur = true;

  function close() {
    opened = false;
    dispatch("close");
  }

  function onClickOut() {
    closeOnBlur && close();
  }
</script>

{#if opened}
  <Overlay on:mousedown on:click="{onClickOut}">
    <div on:click|stopPropagation class="m-auto" style="min-width:{minWidth}px">
      <div class="bg-dark text-light rounded">
        {#if title}
          <div class="p-2 gap-2 flex items-center bg-primary rounded-t">
            <div class="flex-auto font-bold">{title}</div>
            {#if closeCross}
              <Icon
                on:click="{close}"
                icon="{MdClose}"
                class="cursor-pointer"
              />
            {/if}
          </div>
        {/if}
        <slot />
      </div>
    </div>
  </Overlay>
{/if}
