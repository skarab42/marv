<script>
  import { _ } from "@/libs/i18next";
  import { onMount, onDestroy } from "svelte";
  import pannable from "@/libs/svelte/pannable.js";
  import ColorPicker from "@/components/UI/ColorPicker.svelte";

  const localSize = JSON.parse(
    localStorage.getItem("anime.viewer.size") || "{}"
  );

  export let size = {
    width: localSize.width || window.screen.width,
    height: localSize.height || window.screen.height,
  };

  export let position = { top: 0, left: 0 };
  export let zoom = { scale: 1, min: 0.1, max: 10, sensitivity: 50 };

  let viewportWrapper;

  let bgColor = localStorage.getItem("anime.viewer.bgColor") || "#111";

  $: viewportStyle = `
    top:${position.top}px;
    left:${position.left}px;
    width:${size.width}px;
    height:${size.height}px;
    background-color: ${bgColor};
    transform-origin:0 0;
    transform:scale(${zoom.scale});
    outline: ${2 / zoom.scale}px rgba(255,255,255,.1) solid;
  `;

  function viewportPan({ top = 0, left = 0 } = {}) {
    position.top += top;
    position.left += left;
  }

  function computeTranslation(scale) {
    const ratio = 1 - scale / zoom.scale;
    const { top, left } = viewportWrapper.getBoundingClientRect();
    return {
      top: (event.clientY - position.top - top) * ratio,
      left: (event.clientX - position.left - left) * ratio,
    };
  }

  function computeScale(delta) {
    const newScale = zoom.scale + delta / (zoom.sensitivity / zoom.scale);
    return Math.max(zoom.min, Math.min(newScale, zoom.max));
  }

  function viewportFitToScreen() {
    const padding = 50;
    const wrapper = viewportWrapper.getBoundingClientRect();
    const wRatio = (wrapper.width - padding) / size.width;
    const hRatio = (wrapper.height - padding) / size.height;

    zoom.scale = Math.min(wRatio, hRatio);
    position.top = wrapper.height / 2 - (size.height * zoom.scale) / 2;
    position.left = wrapper.width / 2 - (size.width * zoom.scale) / 2;

    localStorage.setItem("anime.viewer.size", JSON.stringify(size));
  }

  function viewportZoom(delta) {
    const scale = computeScale(delta);
    viewportPan(computeTranslation(scale));
    zoom.scale = scale;
  }

  function onPanMove({ detail }) {
    viewportPan({ top: detail.dy, left: detail.dx });
  }

  function onWheel(event) {
    viewportZoom(-event.deltaY / 100);
  }

  function onDoubleClick() {
    viewportFitToScreen();
  }

  onMount(() => {
    setTimeout(viewportFitToScreen, 42);
    window.addEventListener("resize", viewportFitToScreen);
  });

  onDestroy(() => {
    window.removeEventListener("resize", viewportFitToScreen);
  });

  function onBackgroundColor({ detail: color }) {
    bgColor = color.hex;
    localStorage.setItem("anime.viewer.bgColor", bgColor);
  }
</script>

<div class="h-full flex flex-col flex-auto">
  <div class="flex bg-secondary-dark">
    <slot name="header" />
    <div class="flex">
      <ColorPicker
        label="{_('words.color')}"
        on:color="{onBackgroundColor}"
        previewClass="w-10"
        color="{bgColor}"
      />
    </div>
    <div class="p-2 flex space-x-2">
      <span>{_('words.width')}</span>
      <input
        type="number"
        min="{42}"
        style="min-width:70px"
        bind:value="{size.width}"
        class="px-2 w-full text-dark rounded"
        on:change="{viewportFitToScreen}"
      />
    </div>
    <div class="p-2 flex space-x-2">
      <span>{_('words.height')}</span>
      <input
        type="number"
        min="{42}"
        style="min-width:70px"
        bind:value="{size.height}"
        class="px-2 w-full text-dark rounded"
        on:change="{viewportFitToScreen}"
      />
    </div>
  </div>
  <div
    class="h-full relative overflow-hidden"
    use:pannable
    on:panmove="{onPanMove}"
    on:wheel="{onWheel}"
    on:dblclick="{onDoubleClick}"
    bind:this="{viewportWrapper}"
  >
    <div class="absolute overflow-hidden" style="{viewportStyle}">
      <slot />
    </div>
  </div>
</div>
