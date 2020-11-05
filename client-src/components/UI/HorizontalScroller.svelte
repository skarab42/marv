<script>
  import { onMount, afterUpdate } from "svelte";
  import { throttle } from "throttle-debounce";
  import anime from "animejs";

  import Button from "./Button.svelte";
  import MdKeyboardArrowLeft from "svelte-icons/md/MdKeyboardArrowLeft.svelte";
  import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";

  export let gap = 1;
  export let arrowClass = "bg-primary-light rounded-full";

  let element = null;
  let overflowing = false;

  const isOverflowing = () => {
    overflowing = element && element.clientWidth < element.scrollWidth;
  };

  export const scrollTo = (scrollLeft) => {
    anime({
      scrollLeft,
      duration: 500,
      targets: element,
      easing: "easeInOutQuad",
    });
  };

  const scroll = (n) => {
    scrollTo(element.scrollLeft + n * element.clientWidth);
  };

  const throttleScroll = throttle(500, scroll);

  export const scrollLeft = () => {
    scrollTo(0);
  };

  export const scrollRight = () => {
    scrollTo(element.scrollWidth);
  };

  function onWheel(event) {
    event.stopPropagation();
    throttleScroll(event.deltaY / 100);
  }

  onMount(() => {
    element.addEventListener("wheel", onWheel, { passive: true });
  });

  afterUpdate(isOverflowing);
  window.addEventListener("resize", isOverflowing);
</script>

<div class="inline-flex items-center overflow-hidden">
  {#if overflowing}
    <Button
      icon="{MdKeyboardArrowLeft}"
      on:click="{scroll.bind(null, -1)}"
      class="mr-2 {arrowClass}"
    />
  {/if}
  <div
    bind:this="{element}"
    class="flex space-x-{gap} items-center overflow-hidden"
  >
    <slot />
  </div>
  {#if overflowing}
    <Button
      icon="{MdKeyboardArrowRight}"
      on:click="{scroll.bind(null, +1)}"
      class="ml-2 {arrowClass}"
    />
  {/if}
</div>
