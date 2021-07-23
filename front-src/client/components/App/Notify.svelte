<script>
  import { notices, closeNotice, pauseNotice } from "@/stores/notify";
  import RemoveCross from "@/components/UI/RemoveCross.svelte";
  import { slide } from "svelte/transition";

  function progress(node, { duration }) {
    return {
      duration,
      css: (t) => {
        return `width: ${100 - t * 100}%;`;
      },
    };
  }

  const colors = {
    info: "bg-gray-300 text-gray-800",
    success: "bg-green-700 text-gray-300",
    warning: "bg-orange-600 text-gray-300",
    error: "bg-red-700 text-gray-300",
  };

  function color(type) {
    return colors[type] || colors.info;
  }
</script>

<div class="absolute bottom-0 right-0 z-50 max-w-screen-sm">
  <div class="p-2 flex flex-col gap-2">
    {#each $notices as notice (notice.id)}
      <div
        on:mouseenter="{() => pauseNotice(notice)}"
        transition:slide|local
        class="p-4 {color(notice.type)} rounded items-center shadow-md"
      >
        <div class="flex gap-4">
          <div>{notice.message}</div>
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
