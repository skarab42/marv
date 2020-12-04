<script>
  import ms from "ms";

  export let follower;
  export let type;

  function elapsedTime(time) {
    return Date.now() - new Date(time).getTime();
  }

  let time = 0;

  function timer() {
    time = ms(elapsedTime(follower.followedAt));
    setTimeout(timer, 1000);
  }

  timer();

  $: isOffline = type === "offline" && follower.offlineFollow;
  $: isOnline = type === "online" && !follower.offlineFollow;

  $: visible = isOnline || isOffline;
</script>

{#if visible}
  <div class="p-2 flex space-x-2 items-center">
    <div class="px-2 text-xs bg-black bg-opacity-50 rounded-full">{time}</div>
    <div class="font-bold">{follower.name}</div>
  </div>
{/if}
