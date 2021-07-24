<script>
  import Badge from "./Badge.svelte";
  import Notice from "./Notice.svelte";
  import { notices } from "@/stores/notify";
  import { onDestroy, onMount } from "svelte";
  import Button from "@/components/UI/Button.svelte";
  import Overlay from "@/components/UI/Overlay.svelte";
  import MdArrowBack from "svelte-icons/md/MdArrowBack.svelte";

  let opened = false;
  let time = Date.now();
  let intervalId = null;

  function open() {
    opened = true;
  }

  function close() {
    opened = false;
  }

  $: notReadNotices = $notices.filter((notice) => !notice.read);
  $: infoNotices = notReadNotices.filter((notice) => notice.type === "info");
  $: errorNotices = notReadNotices.filter((notice) => notice.type === "error");
  $: warningNotices = notReadNotices.filter(
    (notice) => notice.type === "warning"
  );
  $: successNotices = notReadNotices.filter(
    (notice) => notice.type === "success"
  );

  onMount(() => {
    intervalId = setInterval(() => {
      time = Date.now();
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

{#if $notices.length}
  <Button on:click="{open}" class="bg-black bg-opacity-25">
    <Badge notices="{notReadNotices}" />
    Messages
  </Button>
{/if}

{#if opened}
  <Overlay colors="bg-gray-800">
    <div class="flex-auto">
      <div class="p-2">
        <Button icon="{MdArrowBack}" on:click="{close}">back</Button>
      </div>
      <div class="container m-auto">
        <div class="py-2 text-4xl center">
          Messages
          <Badge type="info" notices="{infoNotices}" />
          <Badge type="warning" notices="{warningNotices}" />
          <Badge type="error" notices="{errorNotices}" />
          <Badge type="success" notices="{successNotices}" />
        </div>
        <div class="flex flex-col">
          {#each $notices as notice (notice.id)}
            <Notice time="{time}" notice="{notice}" />
          {/each}
        </div>
      </div>
    </div>
  </Overlay>
{/if}
