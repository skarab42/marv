<script>
  import { notices, closeNotice, pauseNotice } from "@/stores/notify";
  import RemoveCross from "@/components/UI/RemoveCross.svelte";
  import { slide } from "svelte/transition";
  import { color } from "./colors";

  function progress(node, { duration }) {
    return {
      duration,
      css: (t) => {
        return `width: ${100 - t * 100}%;`;
      },
    };
  }

  $: _notices = $notices.filter((notice) => !notice.closed);
</script>

<div class="absolute bottom-0 right-0 z-50 max-w-screen-sm">
  <div class="p-2 flex flex-col gap-2">
    {#each _notices as notice (notice.id)}
      <div
        on:mouseenter="{() => pauseNotice(notice)}"
        transition:slide|local
        class="p-4 {color(notice.type)} rounded shadow-md"
      >
        <div class="flex gap-4 items-center">
          <div class="flex-auto break-all">{notice.message}</div>
          <RemoveCross
            visible="{notice.options.dismissable}"
            on:click="{() => closeNotice(notice)}"
          />
        </div>
        {#if notice.options.duration}
          <div
            in:progress="{{ duration: notice.options.duration }}"
            class="p mt-2 h-2 bg-opacity-25 bg-black"
          ></div>
        {/if}
      </div>
    {/each}
  </div>
</div>
