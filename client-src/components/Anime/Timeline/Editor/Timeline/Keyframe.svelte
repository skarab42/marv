<script>
  import { getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  import pannable from "@/libs/svelte/pannable.js";

  const dispatch = createEventDispatcher();
  const { selectedKeyframe, pixelPerMs, timeline } = getContext("Editor");
  const { scale } = timeline;

  export let keyframe;

  let halfWidth = 10;

  $: width = (keyframe.duration / pixelPerMs) * $scale;
  $: left = (keyframe.delay / pixelPerMs) * $scale - halfWidth;
  $: red = "bg-yellow-500 bg-opacity-75";
  $: blue = "bg-blue-500 bg-opacity-75";
  $: selectedId = $selectedKeyframe && $selectedKeyframe.id;
  $: selected = selectedId === keyframe.id ? red : blue;

  function onSelect() {
    dispatch("select", keyframe);
  }

  function onPanMove({ detail }) {
    dispatch("move", { keyframe, offset: detail.dx / $scale });
  }

  function onMouseUp(event) {
    if (event.which === 3 && event.detail === 2) {
      dispatch("remove", keyframe);
    }
  }
</script>

<div
  class="absolute z-10 bg-gray-500 bg-opacity-25"
  style="left:{left + halfWidth}px;width:{width}px;height:28.28px"
></div>
<div class="absolute z-20" style="left:{left}px">
  <div
    use:pannable
    on:panmove="{onPanMove}"
    on:mouseup="{onMouseUp}"
    on:mousedown|stopPropagation="{onSelect}"
    class="w-5 h-5 transform rotate-45 {selected} shadow-sm"
  ></div>
</div>
