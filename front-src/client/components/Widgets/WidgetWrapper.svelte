<script>
  import ms from "ms";
  import api from "@/api/actions";
  import { store } from "@/stores/actions";
  import Label from "./WidgetLabel.svelte";
  import Progressbar from "@/components/UI/Progressbar.svelte";
  import MdAutorenew from "svelte-icons/md/MdAutorenew.svelte";

  export let widget;

  export let cls = "";
  export { cls as class };

  let countdownId = 0;
  let elapsedTime = -1;
  let totalDuration = 0;
  let elapsedPercent = 0;
  let totalElapsedTime = 0;

  $: action = $store[widget.id] || {};

  function isOwner(action) {
    return action.widget.id === widget.id;
  }

  function isImmediat(action) {
    return action.widget.trigger === "immediat";
  }

  function clearCountdownInterval() {
    clearInterval(countdownId);
    countdownId = null;
    elapsedTime = -1;
  }

  function countdownInterval(duration, delay, tick) {
    clearCountdownInterval();
    let elapsed = duration;
    countdownId = setInterval(() => {
      elapsed = Math.max(0, elapsed - delay);
      tick({ elapsed, delay });
      if (elapsed === 0) clearCountdownInterval();
    }, delay);
  }

  function minMax(min, max, value) {
    return Math.max(min, Math.min(max, value));
  }

  function percent(value, total) {
    return minMax(0, 100, Math.round((value / total) * 100));
  }

  function onTick({ elapsed, delay }) {
    elapsedTime = elapsed;
    totalElapsedTime += delay;
    elapsedPercent = percent(totalElapsedTime, totalDuration);
  }

  api.on("push", (action) => {
    if (!isOwner(action)) return;
    if (isImmediat(action)) {
      clearCountdownInterval();
      totalElapsedTime = 0;
      totalDuration = action.duration;
    } else {
      totalDuration += action.duration;
    }
  });

  api.on("start", (action) => {
    if (!isOwner(action)) return;
    countdownInterval(action.duration, 100, onTick);
  });

  api.on("end", (action) => {
    if (!isOwner(action)) return;
    if (!isImmediat(action)) {
      clearCountdownInterval();
    }
    if (action.inQueue === 0) {
      totalElapsedTime = 0;
      totalDuration = 0;
    }
  });
</script>

<div
  on:click
  class="relative h-full {widget.borders} flex flex-col overflow-hidden {cls}"
>
  <Label widget="{widget}" />
  <div class="relative flex-auto overflow-hidden">
    <slot />
  </div>
  <slot name="overlay" />
</div>

{#if action && action.inQueue}
  <div
    class="absolute inset-0 pointer-events-none {widget.borders} overflow-hidden"
  >
    {#if action.running}
      <div class="flex w-full h-full opacity-50 animate-spin">
        <MdAutorenew />
      </div>
      {#if elapsedTime > -1}
        <div class="absolute bottom-0 p-1 text-xs opacity-50">
          {ms(elapsedTime)}
        </div>
      {/if}
    {/if}
    <div class="absolute inset-0 flex items-center h-full opacity-50 text-4xl">
      <div class="flex-auto text-center">
        <span
          class="{action.running ? '' : 'px-4 text-dark bg-gray-500 rounded-full'}"
        >{action.inQueue}</span>
      </div>
    </div>
    <div class="absolute left-0 right-0 bottom-0">
      <Progressbar percent="{100 - elapsedPercent}" />
    </div>
  </div>
{/if}
